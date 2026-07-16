import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient, v1Request } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { spaceKey, testName } from './helpers/naming';

/**
 * Reference live integration suite for the Confluence Cloud v2 `space` API
 * (`getSpaces`, `getSpaceById`, `createSpace`) — the template every other
 * cloud suite follows.
 *
 * The assertions verify the *contract* of each function, not merely that a call
 * resolves: returned entities are typed exactly as the Zod models declare; query
 * parameters (`keys`, `type`, `ids`, `limit`, `sort`, `include-*`) have a real,
 * observable effect; the same canonical space comes back consistently across
 * endpoints; and error responses surface as a typed `ApiError`.
 *
 * Shared infrastructure (see `./setup` and `./helpers`):
 *   - `getLiveClient()` — singleton v2 client (host + retry policy);
 *   - `ResourceTracker` — LIFO teardown, retried;
 *   - `testName()` / `spaceKey()` — run-scoped, marker-tagged unique names so a
 *     crashed run is swept by the global setup.
 */

const SPACE_TYPES = [
  'global',
  'collaboration',
  'knowledge_base',
  'personal',
  'system',
  'onboarding',
  'xflow_sample_space',
] as const;

const SPACE_STATUSES = ['current', 'archived'] as const;

let client: ReturnType<typeof createCloudV2Client>;
/** Every space visible to the account — discovered once, used to drive assertions. */
let allSpaces: NonNullable<Awaited<ReturnType<typeof client.space.getSpaces>>['results']>;

/** A meaningful structural check for a space summary returned by the API. */
function expectWellFormedSpace(space: { id?: string; key?: string; type?: string; status?: string; createdAt?: Date }) {
  expect(typeof space.id).toBe('string');
  expect(space.id).toBeTruthy();
  expect(typeof space.key).toBe('string');
  expect(space.key).toBeTruthy();
  expect(SPACE_TYPES).toContain(space.type);
  expect(SPACE_STATUSES).toContain(space.status);
  // `createdAt` is declared `z.coerce.date()`, so a parsed response yields a real Date.
  expect(space.createdAt).toBeInstanceOf(Date);
}

beforeAll(async () => {
  client = getLiveClient();

  allSpaces = (await client.space.getSpaces({ limit: 250 })).results ?? [];
  expect(allSpaces.length, 'the account must have at least one visible space to test against').toBeGreaterThan(0);
});

describe('Confluence Cloud v2 — space.getSpaces (live)', () => {
  it('returns a page of correctly-typed space summaries', async () => {
    const page = await client.space.getSpaces();

    expect(Array.isArray(page.results)).toBe(true);
    expect(page.results!.length).toBeGreaterThan(0);
    // `_links` is the multi-entity links object; `base` is the site URL.
    expect(page._links).toBeDefined();
    page.results!.forEach(expectWellFormedSpace);
  });

  it('honors `limit` and exposes a pagination cursor when more results exist', async () => {
    const firstPage = await client.space.getSpaces({ limit: 1 });

    expect(firstPage.results?.length ?? 0).toBeLessThanOrEqual(1);

    if (allSpaces.length > 1) {
      // With more spaces than the page size, exactly one comes back and the
      // `Link`-header cursor is surfaced as `_links.next`.
      expect(firstPage.results).toHaveLength(1);
      expect(typeof firstPage._links?.next).toBe('string');
      expect(firstPage._links!.next!.length).toBeGreaterThan(0);
    }
  });

  it('filters by `keys` — only spaces with the requested key are returned', async () => {
    const sample = allSpaces[0];

    const filtered = await client.space.getSpaces({ keys: [sample.key!] });

    expect(filtered.results!.length).toBeGreaterThan(0);
    expect(filtered.results!.every(s => s.key === sample.key)).toBe(true);
    expect(filtered.results!.some(s => s.id === sample.id)).toBe(true);
  });

  it('filters by `type` — server-side filter matches a client-side filter of the full list', async () => {
    const sampleType = allSpaces[0].type;
    const expectedCount = allSpaces.filter(s => s.type === sampleType).length;

    const filtered = await client.space.getSpaces({ type: sampleType, limit: 250 });

    expect(filtered.results!.every(s => s.type === sampleType)).toBe(true);
    expect(filtered.results!.length).toBe(expectedCount);
  });

  it('filters by `ids` consistently with the unfiltered listing', async () => {
    const sample = allSpaces[0];

    const filtered = await client.space.getSpaces({ ids: [Number(sample.id)] });

    expect(filtered.results!.every(s => s.id === sample.id)).toBe(true);
    expect(filtered.results!.some(s => s.id === sample.id)).toBe(true);
  });

  it('applies `sort` direction — ascending and descending are mirror orderings', async () => {
    // Capture both orderings back-to-back so they observe the same set of spaces
    // — other suites in the serial run may create/trash spaces, so the snapshot
    // taken in `beforeAll` is not a reliable count here.
    const asc = (await client.space.getSpaces({ sort: 'key', limit: 250 })).results ?? [];
    const desc = (await client.space.getSpaces({ sort: '-key', limit: 250 })).results ?? [];

    if (asc.length < 2) return; // ordering is unobservable with a single space

    const ascKeys = asc.map(s => s.key);
    const descKeys = desc.map(s => s.key);

    // Avoids assuming a specific collation (personal `~`-keys sort unusually):
    // a correct sort param simply makes the two directions exact reverses.
    expect(ascKeys).toHaveLength(descKeys.length);
    expect(ascKeys).toEqual([...descKeys].reverse());
  });
});

describe('Confluence Cloud v2 — space.getSpaceById (live)', () => {
  it('returns the same canonical entity as the corresponding getSpaces summary', async () => {
    const summary = allSpaces[0];

    const full = await client.space.getSpaceById({ id: Number(summary.id) });

    expect(full.id).toBe(summary.id);
    expect(full.key).toBe(summary.key);
    expect(full.name).toBe(summary.name);
    expect(full.type).toBe(summary.type);
    expect(full.status).toBe(summary.status);
    // Every real space exposes a web UI link.
    expect(typeof full._links?.webui).toBe('string');
    expect(full._links!.webui).toBeTruthy();
  });

  it('expands `operations` and `labels` only when the include-* flags are set', async () => {
    const id = Number(allSpaces[0].id);

    const base = await client.space.getSpaceById({ id });
    expect(base.operations).toBeUndefined();
    expect(base.labels).toBeUndefined();

    const expanded = await client.space.getSpaceById({ id, includeOperations: true, includeLabels: true });
    expect(expanded.operations).toBeDefined();
    expect(Array.isArray(expanded.operations?.results)).toBe(true);
    expect(expanded.labels).toBeDefined();
    expect(Array.isArray(expanded.labels?.results)).toBe(true);
  });

  it('rejects a non-existent space id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.space.getSpaceById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — space.createSpace (live, full lifecycle)', () => {
  const tracker = new ResourceTracker();
  const key = spaceKey('create');
  const name = testName('create-space');
  let created: Awaited<ReturnType<typeof client.space.createSpace>>;

  beforeAll(async () => {
    created = await client.space.createSpace({ body: { key, name } });
    // v2 has no deleteSpace, so the space is torn down via the v1 REST endpoint.
    tracker.defer(async () => {
      await v1Request(`space/${key}`, { method: 'DELETE' }).catch(() => undefined);
    });
  });

  afterAll(() => tracker.cleanup());

  it('returns a populated SpaceSummary for the newly created space', () => {
    expect(created.key).toBe(key);
    expect(created.name).toBe(name);
    expect(created.type).toBe('global');
    expect(created.status).toBe('current');
    expect(typeof created.authorId).toBe('string');
    expectWellFormedSpace(created);
    expect(created._links?.webui).toContain(key);
  });

  it('is immediately retrievable via getSpaceById by its returned id', async () => {
    const fetched = await client.space.getSpaceById({ id: Number(created.id) });

    expect(fetched.id).toBe(created.id);
    expect(fetched.key).toBe(key);
    expect(fetched.name).toBe(name);
  });

  it('appears in getSpaces when filtered by its key', async () => {
    const listed = await client.space.getSpaces({ keys: [key] });

    expect(listed.results?.some(s => s.id === created.id)).toBe(true);
  });
});
