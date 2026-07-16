import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';
import { waitFor } from '../helpers/poll';

/**
 * CQL search is one of the reasons v1 still matters — v2 has no equivalent.
 *
 * Search is eventually consistent: freshly created content takes a moment to be
 * indexed, so anything asserting a new page is findable polls rather than assumes.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let spaceKey: string;
let pageTitle: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'search');
  const page = await createTestPage(tracker, space.id, { html: '<p>findable by cql</p>' });

  spaceKey = space.key;
  pageTitle = page.title!;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — search.searchByCQL (live)', () => {
  it('returns a typed search page', async () => {
    const results = await client.search.searchByCQL({ cql: 'type=page', limit: 5 });

    expect(Array.isArray(results.results)).toBe(true);
    expect(typeof results.size).toBe('number');
    expect(results.results.length).toBeLessThanOrEqual(5);

    for (const hit of results.results) {
      expect(typeof hit.title).toBe('string');
      expect(typeof hit.url).toBe('string');
    }
  });

  it('finds the fixture page once it is indexed', async () => {
    // Search is eventually consistent — a page is not indexed the moment it exists.
    const hit = await waitFor(
      async () => {
        const results = await client.search.searchByCQL({ cql: `space="${spaceKey}" and type=page`, limit: 25 });

        return results.results.find(result => result.title?.includes(pageTitle.slice(0, 20)));
      },
      found => Boolean(found),
      { maxAttempts: 8, initialDelayMs: 1_000 },
    );

    expect(hit).toBeTruthy();
  }, 100_000);

  it('honors `limit` and reports totalSize independently of the page size', async () => {
    const results = await client.search.searchByCQL({ cql: 'type=page', limit: 1 });

    expect(results.results.length).toBeLessThanOrEqual(1);

    if (results.totalSize !== undefined) expect(results.totalSize).toBeGreaterThanOrEqual(results.results.length);
  });

  it('rejects malformed CQL with an ApiError rather than an empty page', async () => {
    const error = await client.search.searchByCQL({ cql: 'this is not cql (((' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(400);
  });

  it('scopes results server-side — a space filter never returns other spaces', async () => {
    const results = await client.search.searchByCQL({ cql: `space="${spaceKey}"`, limit: 25 });

    for (const hit of results.results) {
      if (hit.resultGlobalContainer?.title) expect(hit.resultGlobalContainer.title).toContain('cfjs');
    }
  });
});

describe('Confluence Cloud v1 — search.searchUser (live)', () => {
  it('returns a typed page of user search results', async () => {
    const results = await client.search.searchUser({ cql: 'type=user', limit: 5 });

    expect(Array.isArray(results.results)).toBe(true);
    expect(results.results.length).toBeLessThanOrEqual(5);

    for (const hit of results.results) {
      expect(hit.user).toBeDefined();
      expect(typeof hit.user?.type).toBe('string');
    }
  });

  it('rejects malformed CQL with an ApiError', async () => {
    const error = await client.search.searchUser({ cql: 'nonsense (((' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(400);
  });
});

describe('Confluence Cloud v1 — content.searchContentByCQL (live)', () => {
  it('returns typed content rather than search hits', async () => {
    const results = await client.content.searchContentByCQL({ cql: 'type=page', limit: 5 });

    expect(Array.isArray(results.results)).toBe(true);
    expect(results.results.length).toBeLessThanOrEqual(5);

    for (const content of results.results) {
      expect(content).toMatchObject({ type: expect.any(String), status: expect.any(String) });
    }
  });

  it('rejects malformed CQL with an ApiError', async () => {
    const error = await client.content.searchContentByCQL({ cql: 'still (((not cql' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(400);
  });
});
