/**
 * Live-test environment resolution.
 *
 * The cloud vitest config injects the repo-root `.env` into `process.env`
 * (via `loadEnv`), so the three Confluence Cloud credentials are read straight
 * from there. A single, well-typed accessor keeps every suite honest: a missing
 * credential fails loudly and uniformly instead of producing a confusing 401.
 */

export interface LiveTestEnv {
  /** Site base URL, e.g. `https://your-site.atlassian.net` (no trailing slash, no API path). */
  host: string;
  /** Atlassian account email used for basic auth. */
  email: string;
  /** Atlassian API token paired with `email`. */
  apiToken: string;
}

/** True when all credentials required for live tests are present. */
export function hasLiveEnv(): boolean {
  return Boolean(process.env.HOST && process.env.EMAIL && process.env.API_TOKEN);
}

/** Resolve live credentials, throwing a single actionable error when absent. */
export function requireLiveEnv(): LiveTestEnv {
  const host = process.env.HOST?.replace(/\/+$/, '');
  const email = process.env.EMAIL;
  const apiToken = process.env.API_TOKEN;

  if (!host || !email || !apiToken) {
    throw new Error(
      'Live cloud tests require HOST, EMAIL and API_TOKEN in the repo-root .env.\n' +
        'HOST must be the bare site URL (e.g. https://your-site.atlassian.net) — the suites append the API paths.',
    );
  }

  return { host, email, apiToken };
}
