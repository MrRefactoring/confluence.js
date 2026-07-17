/**
 * Shared live clients for both API suites.
 *
 * Every suite calls {@link getV2Client} / {@link getV1Client} in `beforeAll` rather
 * than constructing its own, so retry and auth policy are defined once.
 *
 * Both factories take the bare site URL: the API path (`/wiki/api/v2`,
 * `/wiki/rest/api`) lives in the generated request URLs, so one `host` drives both
 * versions.
 *
 * {@link rawRequest} stays for the last gap neither typed client covers — multipart
 * attachment upload, which is not in either OpenAPI spec.
 */
import { createV1Client, type V1Client } from '#/v1';
import { createV2Client, type V2Client } from '#/v2';
import { requireLiveEnv } from './env';

let cachedV2Client: V2Client | null = null;
let cachedV1Client: V1Client | null = null;

/**
 * `retry` rides out the occasional transient TLS reset / 5xx Atlassian Cloud
 * throws, without masking real 4xx failures.
 */
const RETRY = { maxAttempts: 3, initialDelayMs: 300 } as const;

/** Singleton Cloud v2 client. */
export function getV2Client(): V2Client {
  if (!cachedV2Client) {
    const { host, email, apiToken } = requireLiveEnv();

    cachedV2Client = createV2Client({
      host,
      auth: { type: 'basic', email, apiToken },
      retry: RETRY,
    });
  }

  return cachedV2Client;
}

/**
 * Singleton Cloud v1 client.
 *
 * Deliberately configured exactly like the v2 one, with no XSRF header: v1
 * enforces XSRF protection on every mutating call, and the generated code carries
 * `X-Atlassian-Token: no-check` on each of them. That this suite's writes pass
 * with a bare config is the proof the header is really being sent.
 */
export function getV1Client(): V1Client {
  if (!cachedV1Client) {
    const { host, email, apiToken } = requireLiveEnv();

    cachedV1Client = createV1Client({
      host,
      auth: { type: 'basic', email, apiToken },
      retry: RETRY,
    });
  }

  return cachedV1Client;
}

/** Basic-auth header value for raw REST calls. */
function authHeader(): string {
  const { email, apiToken } = requireLiveEnv();

  return `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`;
}

export interface RawRequestOptions {
  method?: string;
  /** JSON body — serialized and sent with `Content-Type: application/json`. */
  body?: unknown;
  /** Pre-built body (e.g. `FormData`) sent as-is; takes precedence over `body`. */
  raw?: BodyInit;
  headers?: Record<string, string>;
}

/**
 * Minimal authenticated fetch against the v1 REST API (`${HOST}/wiki/rest/api/<path>`).
 *
 * Only for what the typed clients cannot express — multipart attachment upload,
 * which neither spec declares. Anything else has a typed call; use that instead.
 * Returns the parsed JSON body, and throws on a non-2xx with the status and body text.
 */
export async function rawRequest<T = unknown>(path: string, options: RawRequestOptions = {}): Promise<T> {
  const { host } = requireLiveEnv();
  const headers: Record<string, string> = {
    Authorization: authHeader(),
    Accept: 'application/json',
    ...options.headers,
  };

  let body: BodyInit | undefined = options.raw;

  if (body === undefined && options.body !== undefined) {
    body = JSON.stringify(options.body);
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${host}/wiki/rest/api/${path.replace(/^\/+/, '')}`, {
    method: options.method ?? 'GET',
    headers,
    body,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`raw ${options.method ?? 'GET'} ${path} → ${response.status} ${response.statusText} ${text}`);
  }

  const text = await response.text();

  return (text ? JSON.parse(text) : undefined) as T;
}
