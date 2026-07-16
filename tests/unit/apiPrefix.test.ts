import { afterEach, describe, expect, it, vi } from 'vitest';
import { createClient } from '#/core';
import { getPages } from '#/v2';
import { searchContentByCQL } from '#/v1';
import { createV1Client, createV2Client } from '#/index';

/**
 * The API path (`/wiki/api/v2`, `/wiki/rest/api`) lives in the generated request
 * URLs, not in `host`. That is what lets one client drive both versions and keeps
 * `host` the bare site URL it was in 2.x.
 *
 * It is also invisible in day-to-day work and comes from generator config
 * (`endpointUrlPrefix`), so a regeneration could drop it and nothing else here
 * would notice — every call would just 404 against a live site. These tests pin it.
 */

const HOST = 'https://acme.atlassian.net';
const AUTH = { type: 'basic', email: 'a@b.c', apiToken: 'token' } as const;

/**
 * Records every request URL. Answers 204, which sendRequest returns as undefined
 * without running the response schema — these tests are about the URL that gets
 * built, so they should not also have to satisfy each endpoint's response shape.
 */
function captureUrl(): { urls: string[] } {
  const urls: string[] = [];

  vi.stubGlobal('fetch', (url: string) => {
    urls.push(url);

    return Promise.resolve(new Response(null, { status: 204 }));
  });

  return { urls };
}

afterEach(() => vi.unstubAllGlobals());

describe('API path prefixes', () => {
  it('puts v2 calls under /wiki/api/v2', async () => {
    const { urls } = captureUrl();

    await getPages(createClient({ host: HOST, auth: AUTH }), {});

    expect(urls[0]).toBe(`${HOST}/wiki/api/v2/pages`);
  });

  it('puts v1 calls under /wiki/rest/api', async () => {
    const { urls } = captureUrl();

    await searchContentByCQL(createClient({ host: HOST, auth: AUTH }), { cql: 'type=page' });

    expect(urls[0]).toContain(`${HOST}/wiki/rest/api/content/search`);
  });

  it('drives both versions from a single client', async () => {
    const { urls } = captureUrl();
    const client = createClient({ host: HOST, auth: AUTH });

    await getPages(client, {});
    await searchContentByCQL(client, { cql: 'type=page' });

    expect(urls[0]).toContain('/wiki/api/v2/');
    expect(urls[1]).toContain('/wiki/rest/api/');
  });

  it('takes the bare site URL in both factories, as 2.x did', async () => {
    const { urls } = captureUrl();

    await createV2Client({ host: HOST, auth: AUTH }).page.getPages({});
    await createV1Client({ host: HOST, auth: AUTH }).content.searchContentByCQL({ cql: 'type=page' });

    expect(urls[0]).toBe(`${HOST}/wiki/api/v2/pages`);
    expect(urls[1]).toContain(`${HOST}/wiki/rest/api/content/search`);
  });

  it('tolerates a trailing slash on host without doubling it', async () => {
    const { urls } = captureUrl();

    await getPages(createClient({ host: `${HOST}/`, auth: AUTH }), {});

    expect(urls[0]).toBe(`${HOST}/wiki/api/v2/pages`);
  });

  it('keeps a path-carrying host, for sites behind a proxy prefix', async () => {
    const { urls } = captureUrl();

    await getPages(createClient({ host: 'https://proxy.internal/confluence', auth: AUTH }), {});

    expect(urls[0]).toBe('https://proxy.internal/confluence/wiki/api/v2/pages');
  });
});
