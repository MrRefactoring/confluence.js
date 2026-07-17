import { bodyToFetchBody, requiresDuplex, shouldSetJsonContentType } from './bodyToFetchBody.js';
import type { Auth, ClientConfig, SendRequestOptions } from './schemas/index.js';
import type { Client } from './interfaces/index.js';
import { ApiError } from './apiError.js';
import { BufferSchema } from './formData/index.js';
import { buildUrlWithSearchParams } from './serializeSearchParams.js';

/** Node/undici error codes that signal a recoverable transport-layer failure. */
const TRANSIENT_NETWORK_CODES = new Set([
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'ENOTFOUND',
  'EAI_AGAIN',
  'EPIPE',
  'UND_ERR_SOCKET',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_BODY_TIMEOUT',
]);
/** HTTP statuses that signal a recoverable upstream failure. */
const TRANSIENT_HTTP_STATUSES = new Set([502, 503, 504]);

function isTransientNetworkError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;

  const stack: unknown[] = [];
  let cur: unknown = err;
  while (cur && stack.length < 5) {
    stack.push(cur);
    cur = (cur as { cause?: unknown }).cause;
  }

  for (const node of stack) {
    if (!(node instanceof Error)) continue;

    const code = (node as Error & { code?: string }).code;

    if (code && TRANSIENT_NETWORK_CODES.has(code)) return true;

    // OpenSSL errors surface as ERR_SSL_* — any of them indicates a broken TLS session.
    if (code?.startsWith('ERR_SSL_')) return true;
  }

  return false;
}

function base64Encode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }

  return btoa(unescape(encodeURIComponent(str)));
}

async function getAuthHeaders(auth: Auth): Promise<Record<string, string>> {
  if (auth.type === 'basic') {
    const encoded = base64Encode(`${auth.email}:${auth.apiToken}`);

    return { Authorization: `Basic ${encoded}` };
  }

  if ('getToken' in auth) {
    const token = await auth.getToken();

    return { Authorization: `Bearer ${token}` };
  }

  return { Authorization: `Bearer ${auth.token}` };
}

/**
 * Creates a low-level Confluence API client.
 *
 * The client carries only transport, auth and retry policy — it is version agnostic, so one instance drives both
 * `confluence.js/v1` and `confluence.js/v2`.
 *
 * Prefer `createV1Client` / `createV2Client` from `confluence.js` unless you want the flat functions and a smaller
 * bundle.
 *
 * @stable
 */
export function createClient(config: ClientConfig): Client {
  const { host, auth, headers: configHeaders = {}, getAuthOn401, retry } = config;
  const retryMaxAttempts = Math.max(1, retry?.maxAttempts ?? 1);
  const retryInitialDelayMs = retry?.initialDelayMs ?? 500;
  const retryBackoffFactor = retry?.backoffFactor ?? 2;

  return {
    async sendRequest<T>(requestConfig: SendRequestOptions<T>): Promise<T> {
      const path = requestConfig.url.startsWith('/') ? requestConfig.url : `/${requestConfig.url}`;
      const normalizedHost = host && (host.endsWith('/') ? host.slice(0, -1) : host);
      const url = normalizedHost ? normalizedHost + path : requestConfig.url;
      const fullUrl = buildUrlWithSearchParams(url, requestConfig.searchParams);

      const rawBody = requestConfig.body;
      const body = rawBody === undefined || rawBody === null ? undefined : bodyToFetchBody(rawBody);

      const doRequest = async (authHeaders: Record<string, string>): Promise<Response> => {
        const headers: Record<string, string> = {
          Accept: 'application/json',
          ...(shouldSetJsonContentType(rawBody) ? { 'Content-Type': 'application/json' } : {}),
          ...authHeaders,
          ...configHeaders,
          ...requestConfig.headers,
        };

        const init: RequestInit & { duplex?: 'half' } = {
          method: requestConfig.method,
          headers: Object.keys(headers).length > 0 ? headers : undefined,
          body: body as BodyInit,
        };

        if (requiresDuplex(rawBody)) {
          init.duplex = 'half';
        }

        return fetch(fullUrl, init);
      };

      let derivedAuthHeaders = auth ? await getAuthHeaders(auth) : {};
      let response: Response;
      let delayMs = retryInitialDelayMs;
      let networkAttempt = 0;
      // Retry loop: covers transport-layer failures (TLS/socket/DNS) and
      // 502/503/504 upstream failures. Auth re-derivation on 401 happens once
      // per response cycle, inside the loop, so a refreshed token survives
      // subsequent transient retries.

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- intentional retry loop
      while (true) {
        try {
          response = await doRequest(derivedAuthHeaders);
        } catch (err) {
          if (networkAttempt + 1 < retryMaxAttempts && isTransientNetworkError(err)) {
            networkAttempt += 1;
            await new Promise<void>(resolve => setTimeout(resolve, delayMs));
            delayMs = Math.round(delayMs * retryBackoffFactor);
            continue;
          }

          throw err;
        }

        if (response.status === 401 && getAuthOn401) {
          const newAuth = await getAuthOn401();
          derivedAuthHeaders = await getAuthHeaders(newAuth);
          continue;
        }

        if (TRANSIENT_HTTP_STATUSES.has(response.status) && networkAttempt + 1 < retryMaxAttempts) {
          networkAttempt += 1;
          await new Promise<void>(resolve => setTimeout(resolve, delayMs));
          delayMs = Math.round(delayMs * retryBackoffFactor);
          continue;
        }

        break;
      }

      if (!response.ok) {
        const text = await response.text();
        let detail: unknown = text;
        try {
          detail = JSON.parse(text);
        } catch {
          //
        }
        throw new ApiError(
          `Request failed: ${response.status} ${response.statusText}${text ? ` - ${text}` : ''}`,
          response.status,
          response.statusText,
          detail,
        );
      }

      const contentType = response.headers.get('content-type');

      if (response.status === 204) return undefined as T;

      // A download endpoint says so with `BufferSchema`, and it is the only
      // reliable signal: the response carries the *file's* content type, so
      // `text/plain` is as legitimate for a download as `application/pdf` and
      // sniffing the header cannot tell the two intents apart. Without this the
      // body was dropped on the floor and every download resolved to `undefined`.
      if ((requestConfig.schema as unknown) === BufferSchema) {
        return BufferSchema.parse(new Uint8Array(await response.arrayBuffer())) as T;
      }

      if (contentType && !contentType.includes('application/json')) {
        return undefined as T;
      }

      let data: unknown;

      if (contentType?.includes('application/json')) {
        const text = await response.text();

        try {
          data = JSON.parse(text);
        } catch (e) {
          if (e instanceof SyntaxError) {
            // Confluence sometimes sends application/json Content-Type with a plain-text body
            data = text || undefined;
          } else {
            throw e;
          }
        }
      } else {
        const text = await response.text();

        data = text || undefined;
      }

      if (requestConfig.schema && data !== undefined) {
        return requestConfig.schema.parse(data) as T;
      }

      return data as T;
    },
  };
}
