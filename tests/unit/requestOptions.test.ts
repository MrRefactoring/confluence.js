import { describe, expect, it, vi } from 'vitest';
import { createClient } from '#/core';
import { getPages } from '#/v2';
import { searchContentByCQL } from '#/v1';

describe('per-request cancellation', () => {
  it('passes signals through both generated API versions', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    const client = createClient({ host: 'https://acme.atlassian.net', fetch });
    const signal = new AbortController().signal;

    await getPages(client, {}, { signal });
    await searchContentByCQL(client, { cql: 'type=page' }, { signal });

    expect(fetch.mock.calls.map(([, init]) => init.signal)).toEqual([signal, signal]);
  });

  it('preserves the abort reason without retrying or wrapping it as a network error', async () => {
    const reason = new Error('Cancelled by caller');
    const controller = new AbortController();

    controller.abort(reason);

    const fetch = vi.fn().mockImplementation((_url, init) => Promise.reject(init.signal.reason));
    const client = createClient({ host: 'https://acme.atlassian.net', fetch, retry: { maxAttempts: 3 } });

    await expect(getPages(client, {}, { signal: controller.signal })).rejects.toBe(reason);
    expect(fetch).toHaveBeenCalledOnce();
  });
});
