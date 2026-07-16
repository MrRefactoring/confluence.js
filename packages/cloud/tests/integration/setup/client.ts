/**
 * Shared live clients for the cloud integration suite.
 *
 * Every suite calls {@link getLiveClient} in `beforeAll` rather than constructing
 * its own client, so retry/auth policy is defined once. A second, thin v1 REST
 * helper ({@link v1Request}) covers the handful of operations the v2 API does not
 * expose but the tests still need — deleting a space and uploading an attachment.
 */
import { createCloudV2Client } from '@confluence.js/cloud';
import { requireLiveEnv } from './env';

type CloudV2Client = ReturnType<typeof createCloudV2Client>;

let cachedClient: CloudV2Client | null = null;

/**
 * Singleton v2 client pointed at `${HOST}/wiki/api/v2`.
 *
 * `retry` rides out the occasional transient TLS reset / 5xx Atlassian Cloud
 * throws without masking real 4xx failures.
 */
export function getLiveClient(): CloudV2Client {
  if (!cachedClient) {
    const { host, email, apiToken } = requireLiveEnv();

    cachedClient = createCloudV2Client({
      host: `${host}/wiki/api/v2`,
      auth: { type: 'basic', email, apiToken },
      retry: { maxAttempts: 3, initialDelayMs: 300 },
    });
  }

  return cachedClient;
}

/** Basic-auth header value for raw v1 REST calls. */
function authHeader(): string {
  const { email, apiToken } = requireLiveEnv();

  return `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`;
}

export interface V1RequestOptions {
  method?: string;
  /** JSON body — serialized and sent with `Content-Type: application/json`. */
  body?: unknown;
  /** Pre-built body (e.g. `FormData`) sent as-is; takes precedence over `body`. */
  raw?: BodyInit;
  headers?: Record<string, string>;
}

/**
 * Minimal authenticated fetch against the v1 REST API
 * (`${HOST}/wiki/rest/api/<path>`). Used only for the gaps in v2 — chiefly
 * `DELETE /space/{key}` (v2 has no deleteSpace) and multipart attachment upload.
 * Returns the parsed JSON body, or the raw `Response` for callers that need the
 * status. Throws on a non-2xx response with the status and body text.
 */
export async function v1Request<T = unknown>(path: string, options: V1RequestOptions = {}): Promise<T> {
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
    throw new Error(`v1 ${options.method ?? 'GET'} ${path} → ${response.status} ${response.statusText} ${text}`);
  }

  const text = await response.text();

  return (text ? JSON.parse(text) : undefined) as T;
}
