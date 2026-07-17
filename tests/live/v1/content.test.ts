import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client, getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * What is left of the `content` namespace after Atlassian pruned the v1 spec:
 * `getContent`, `createContent`, `updateContent` and `deleteContent` are all gone
 * to v2. These four stayed because v2 has no answer for them — archiving, CQL
 * search, and publishing blueprint drafts.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let spaceId: string;
let spaceKey: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'content');

  spaceId = space.id;
  spaceKey = space.key;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — content.searchContentByCQL (live)', () => {
  it('returns a typed page of content for a CQL query', async () => {
    const results = await client.content.searchContentByCQL({ cql: `space="${spaceKey}"`, limit: 5 });

    expect(Array.isArray(results.results)).toBe(true);
    expect(typeof results.size).toBe('number');
  });

  // No fresh-content lookup here: that costs a long wait on the search index, and
  // the `search.searchByCQL` suite already proves new content becomes findable.
  // What is left to prove is this endpoint's own contract — the query reaches it
  // and the results come back typed.
  it('returns typed content entries, with the expansions asked for', async () => {
    const results = await client.content.searchContentByCQL({
      cql: 'type=page',
      expand: ['space', 'version'],
      limit: 3,
    });

    for (const result of results.results) {
      expect(result).toMatchObject({ id: expect.any(String), type: 'page' });
      expect(result.version?.number).toBeGreaterThan(0);
    }
  });

  it('honors `limit`', async () => {
    const results = await client.content.searchContentByCQL({ cql: 'type=page', limit: 1 });

    expect(results.results.length).toBeLessThanOrEqual(1);
  });

  it('rejects malformed CQL with an ApiError', async () => {
    const error = await client.content.searchContentByCQL({ cql: 'this is not cql' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — content.archivePages (live, async task)', () => {
  it('archives a page through a long-running task, and v2 reports it archived', async () => {
    const v2 = getV2Client();
    const page = await createTestPage(tracker, spaceId, { title: testName('archivable') });

    const started = await client.content.archivePages({ pages: [{ id: Number(page.id) }] });

    expect(started.id).toBeTruthy();

    await waitFor(
      () => client.longRunningTask.getTask({ id: started.id! }),
      value => value.finished === true || value.percentageComplete === 100,
      { maxAttempts: 8, initialDelayMs: 1000 },
    );

    const archived = await v2.page.getPageById({ id: Number(page.id) });

    expect(archived.status).toBe('archived');
  }, 120_000);

  // An id that resolves to nothing is a 500, not a 400 or a 404: the endpoint
  // queues work first and only then discovers there is no such page. Pinned as the
  // 500 it is, rather than the 4xx it ought to be.
  it('answers an unknown page id with a typed 500', async () => {
    const error = await client.content.archivePages({ pages: [{ id: 0 }] }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(500);
  }, 60_000);
});

describe('Confluence Cloud v1 — blueprint draft publishing (live, gated-graceful)', () => {
  // Publishing needs a draft created from a blueprint, which needs a blueprint —
  // sites without one have nothing to publish. Both endpoints are pinned for their
  // parameter shape and typed refusal; the `status` query parameter and the body's
  // own `status` field collide by name in the spec, and only stay separable
  // because the generator no longer flattens a colliding body into the parameters.
  it('refuses to publish a legacy draft that does not exist, in a typed way', async () => {
    const error = await client.content
      .publishLegacyDraft({
        draftId: '0',
        status: 'draft',
        body: {
          version: { number: 2 },
          title: testName('legacy-draft'),
          type: 'page',
          space: { key: spaceKey },
        },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((error as ApiError).status);
  });

  it('refuses to publish a shared draft that does not exist, in a typed way', async () => {
    const error = await client.content
      .publishSharedDraft({
        draftId: '0',
        status: 'draft',
        body: {
          version: { number: 2 },
          title: testName('shared-draft'),
          type: 'page',
          space: { key: spaceKey },
        },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((error as ApiError).status);
  });
});
