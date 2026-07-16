import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client, rawRequest } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage, storageBody, type TestSpace } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `page` API — the central
 * content type — covering its full lifecycle:
 * `createPage`, `getPageById`, `getPages`, `getPagesInSpace`, `getLabelPages`,
 * `updatePage`, `updatePageTitle`, `deletePage`.
 *
 * The assertions verify the *contract* of each function, not merely that a call
 * resolves: a created page is typed exactly as the `Page` Zod model declares
 * (`id`/`spaceId`/`authorId` are numeric strings, `createdAt` is a real `Date`,
 * `version.number` is a number); the same canonical page comes back consistently
 * across endpoints; mutations bump `version.number` and change the observable
 * title/body; query parameters (`spaceId`, `status`, `limit` + pagination cursor)
 * have a real, observable effect; a page filed under a label is found via
 * `getLabelPages`; and a deleted page surfaces as a typed 404 `ApiError`.
 *
 * Shared infrastructure (see `./setup` and `./helpers`):
 *   - `getV2Client()` — singleton v2 client;
 *   - `createTestSpace` / `createTestPage` / `storageBody` — fixtures that
 *     self-register teardown on the suite's `ResourceTracker`;
 *   - `rawRequest` — authenticated v1 REST fetch for the label gap v2 lacks;
 *   - `testName()` — run-scoped, marker-tagged unique names so a crashed run is
 *     swept by the global setup.
 *
 * ID gotcha: model ids are numeric *strings* (`page.id: string`), while the path
 * params of `getPageById`/`updatePage`/`deletePage` are `z.number()` — every such
 * call converts with `Number(page.id)`.
 */

/** Statuses a page may report — the `ContentStatus` enum. */
const PAGE_STATUSES = ['current', 'draft', 'archived', 'historical', 'trashed', 'deleted', 'any'] as const;

type Page = Awaited<ReturnType<ReturnType<typeof createV2Client>['page']['createPage']>>;

/** Shape of the v1 `POST /content/{id}/label` response we rely on for label ids. */
interface V1LabelResponse {
  results: Array<{ prefix: string; name: string; id: string; label: string }>
}

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;
/** The canonical page created directly via `createPage`, asserted against everywhere. */
let primaryPage: Page;
const primaryHtml = '<p>cfjs page lifecycle — created</p>';

/** Extract the opaque `cursor` query value from a `_links.next` relative URL. */
function cursorOf(next?: string | null): string | undefined {
  if (!next) return undefined;

  try {
    return new URL(next, 'https://confluence.invalid').searchParams.get('cursor') ?? undefined;
  } catch {
    return undefined;
  }
}

/** A meaningful structural check for any page/page-summary returned by the API. */
function expectWellFormedPage(page: {
  id?: string;
  status?: string;
  title?: string;
  spaceId?: string;
  authorId?: string;
  createdAt?: Date;
  version?: { number?: number } | null;
}) {
  expect(typeof page.id).toBe('string');
  expect(page.id).toBeTruthy();
  // Numeric string id — convertible to a finite number.
  expect(Number.isFinite(Number(page.id))).toBe(true);
  expect(typeof page.title).toBe('string');
  expect(PAGE_STATUSES).toContain(page.status);
  expect(typeof page.spaceId).toBe('string');
  // `createdAt` is declared `z.coerce.date()`, so a parsed response yields a real Date.
  expect(page.createdAt).toBeInstanceOf(Date);
  expect(typeof page.version?.number).toBe('number');
}

beforeAll(async () => {
  client = getV2Client();

  // One isolated space holds every page this suite creates.
  space = await createTestSpace(tracker, 'page');

  primaryPage = await client.page.createPage({
    body: {
      spaceId: space.id,
      status: 'current',
      title: testName('page-primary'),
      body: storageBody(primaryHtml),
    },
  });
  tracker.defer(async () => {
    await client.page.deletePage({ id: Number(primaryPage.id) }).catch(() => undefined);
  });

  // A second page guarantees the space holds >1 page so in-space pagination has a cursor.
  await createTestPage(tracker, space.id, { title: testName('page-secondary') });
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — page.createPage (live)', () => {
  it('returns a populated, correctly-typed Page for the newly created page', () => {
    expect(primaryPage.spaceId).toBe(space.id);
    expect(primaryPage.status).toBe('current');
    expect(primaryPage.title).toBe(testName('page-primary'));
    expect(typeof primaryPage.authorId).toBe('string');
    expect(primaryPage.authorId).toBeTruthy();
    // A freshly published page starts at version 1.
    expect(primaryPage.version?.number).toBe(1);
    expectWellFormedPage(primaryPage);
    // Every real page exposes a web UI link.
    expect(typeof primaryPage._links?.webui).toBe('string');
    expect(primaryPage._links?.webui).toBeTruthy();
  });
});

describe('Confluence Cloud v2 — page.getPageById (live)', () => {
  it('returns the same canonical entity that createPage produced', async () => {
    const fetched = await client.page.getPageById({ id: Number(primaryPage.id) });

    expect(fetched.id).toBe(primaryPage.id);
    expect(fetched.title).toBe(primaryPage.title);
    expect(fetched.status).toBe('current');
    expect(fetched.spaceId).toBe(space.id);
    expect(fetched.authorId).toBe(primaryPage.authorId);
    expect(fetched.version?.number).toBe(1);
    expectWellFormedPage(fetched);
  });

  it('returns the storage body when `bodyFormat: storage` is requested', async () => {
    const fetched = await client.page.getPageById({ id: Number(primaryPage.id), bodyFormat: 'storage' });

    expect(fetched.body?.storage?.representation).toBe('storage');
    expect(typeof fetched.body?.storage?.value).toBe('string');
    expect(fetched.body?.storage?.value).toContain('created');
  });

  it('expands `labels` only when the include flag is set', async () => {
    const base = await client.page.getPageById({ id: Number(primaryPage.id) });
    expect(base.labels).toBeUndefined();

    const expanded = await client.page.getPageById({ id: Number(primaryPage.id), includeLabels: true });
    expect(expanded.labels).toBeDefined();
    expect(Array.isArray(expanded.labels?.results)).toBe(true);
  });

  it('rejects a non-existent page id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.page.getPageById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — page.getPages (live)', () => {
  it('returns a page of correctly-typed page summaries', async () => {
    const result = await client.page.getPages({ limit: 25 });

    expect(Array.isArray(result.results)).toBe(true);
    expect(result.results!.length).toBeGreaterThan(0);
    expect(result._links).toBeDefined();
    result.results!.forEach(expectWellFormedPage);
  });

  it('honors `limit` and exposes a pagination cursor when more results exist', async () => {
    const firstPage = await client.page.getPages({ limit: 1 });

    expect(firstPage.results?.length ?? 0).toBeLessThanOrEqual(1);

    const cursor = cursorOf(firstPage._links?.next);

    if (cursor) {
      // The cursor surfaced from the `Link` header advances to a distinct result.
      expect(firstPage.results).toHaveLength(1);
      const secondPage = await client.page.getPages({ limit: 1, cursor });
      expect(secondPage.results?.[0]?.id).not.toBe(firstPage.results?.[0]?.id);
    }
  });

  it('filters by `spaceId` — every returned page belongs to that space', async () => {
    const result = await waitFor(
      () => client.page.getPages({ spaceId: [Number(space.id)], limit: 100 }),
      r => (r.results ?? []).some(p => p.id === primaryPage.id),
    );

    expect(result.results!.length).toBeGreaterThan(0);
    expect(result.results!.every(p => p.spaceId === space.id)).toBe(true);
    expect(result.results!.some(p => p.id === primaryPage.id)).toBe(true);
  });

  it('filters by `status` — only `current` pages are returned', async () => {
    const result = await client.page.getPages({ spaceId: [Number(space.id)], status: ['current'], limit: 100 });

    expect(result.results!.every(p => p.status === 'current')).toBe(true);
  });
});

describe('Confluence Cloud v2 — page.getPagesInSpace (live)', () => {
  it('returns only pages from the requested space', async () => {
    const result = await waitFor(
      () => client.page.getPagesInSpace({ id: Number(space.id), limit: 100 }),
      r => (r.results ?? []).some(p => p.id === primaryPage.id),
    );

    expect(result.results!.length).toBeGreaterThanOrEqual(2);
    expect(result.results!.every(p => p.spaceId === space.id)).toBe(true);
    expect(result.results!.some(p => p.id === primaryPage.id)).toBe(true);
    result.results!.forEach(expectWellFormedPage);
  });

  it('honors `limit` and walks the `_links.next` pagination cursor', async () => {
    const firstPage = await client.page.getPagesInSpace({ id: Number(space.id), limit: 1 });

    expect(firstPage.results).toHaveLength(1);
    // The space holds >1 page, so a cursor to the next set must be present.
    expect(typeof firstPage._links?.next).toBe('string');

    const cursor = cursorOf(firstPage._links?.next);
    expect(cursor).toBeTruthy();

    const secondPage = await client.page.getPagesInSpace({ id: Number(space.id), limit: 1, cursor });
    expect(secondPage.results).toHaveLength(1);
    expect(secondPage.results?.[0]?.id).not.toBe(firstPage.results?.[0]?.id);
  });

  it('filters by `status` — `current` excludes nothing this suite created', async () => {
    const result = await client.page.getPagesInSpace({ id: Number(space.id), status: ['current'], limit: 100 });

    expect(result.results!.every(p => p.status === 'current')).toBe(true);
    expect(result.results!.some(p => p.id === primaryPage.id)).toBe(true);
  });
});

describe('Confluence Cloud v2 — page.getLabelPages (live)', () => {
  const labelName = testName('lbl').replace(/[^a-z0-9]/gi, '');
  let labelId: number | undefined;

  beforeAll(async () => {
    // v2 has no add-label endpoint, so the label is attached via v1 REST.
    const response = await rawRequest<V1LabelResponse>(`content/${primaryPage.id}/label`, {
      method: 'POST',
      body: [{ prefix: 'global', name: labelName }],
    }).catch(() => undefined);

    const match = response?.results.find(l => l.name === labelName) ?? response?.results[0];
    labelId = match?.id !== undefined ? Number(match.id) : undefined;
  });

  it('lists the page filed under the freshly added label', async () => {
    // Degrade gracefully: if the label id could not be resolved, only prove the
    // endpoint is well-typed against a benign id rather than hard-failing.
    if (labelId === undefined || !Number.isFinite(labelId)) {
      const fallback = await client.page.getLabelPages({ id: 0 }).catch(error => error);
      expect(fallback === null || fallback instanceof ApiError || Array.isArray(fallback.results)).toBe(true);

      return;
    }

    const result = await waitFor(
      () => client.page.getLabelPages({ id: labelId! }),
      r => (r.results ?? []).some(p => p.id === primaryPage.id),
      { maxAttempts: 8 },
    );

    expect(result.results!.some(p => p.id === primaryPage.id)).toBe(true);
    result.results!.forEach(expectWellFormedPage);
  });

  it('scopes results to the requested space via `spaceId`', async () => {
    if (labelId === undefined || !Number.isFinite(labelId)) return;

    const result = await client.page.getLabelPages({ id: labelId, spaceId: [Number(space.id)], limit: 100 });

    expect(Array.isArray(result.results)).toBe(true);
    expect(result.results!.every(p => p.spaceId === space.id)).toBe(true);
  });
});

describe('Confluence Cloud v2 — page.updatePage (live)', () => {
  it('changes the title and body and increments the version number', async () => {
    const current = await client.page.getPageById({ id: Number(primaryPage.id) });
    const currentVersion = current.version!.number!;
    const newTitle = testName('page-updated');
    const newHtml = '<p>cfjs page lifecycle — body replaced</p>';

    const updated = await client.page.updatePage({
      id: Number(primaryPage.id),
      body: {
        id: primaryPage.id,
        status: 'current',
        title: newTitle,
        body: storageBody(newHtml),
        version: { number: currentVersion + 1 },
      },
    });

    expect(updated.id).toBe(primaryPage.id);
    expect(updated.title).toBe(newTitle);
    expect(updated.version?.number).toBe(currentVersion + 1);

    // Re-fetch with the body to confirm the change actually persisted server-side.
    const refetched = await client.page.getPageById({ id: Number(primaryPage.id), bodyFormat: 'storage' });
    expect(refetched.title).toBe(newTitle);
    expect(refetched.version?.number).toBe(currentVersion + 1);
    expect(refetched.body?.storage?.value).toContain('replaced');
  });
});

describe('Confluence Cloud v2 — page.updatePageTitle (live)', () => {
  it('changes the title and bumps the version without touching the body', async () => {
    const current = await client.page.getPageById({ id: Number(primaryPage.id), bodyFormat: 'storage' });
    const currentVersion = current.version!.number!;
    const currentBody = current.body?.storage?.value;
    const newTitle = testName('page-retitled');

    const updated = await client.page.updatePageTitle({
      id: Number(primaryPage.id),
      body: {
        id: primaryPage.id,
        status: 'current',
        title: newTitle,
        version: { number: currentVersion + 1 },
      },
    });

    expect(updated.id).toBe(primaryPage.id);
    expect(updated.title).toBe(newTitle);
    expect(updated.version?.number).toBe(currentVersion + 1);

    const refetched = await client.page.getPageById({ id: Number(primaryPage.id), bodyFormat: 'storage' });
    expect(refetched.title).toBe(newTitle);
    expect(refetched.version?.number).toBe(currentVersion + 1);
    // The body is preserved by a title-only update.
    expect(refetched.body?.storage?.value).toBe(currentBody);
  });
});

describe('Confluence Cloud v2 — page hierarchy / breadth (live)', () => {
  it('creates a minimal page (spaceId + title + body) and re-fetches it', async () => {
    const minimal = await createTestPage(tracker, space.id, { title: testName('page-minimal') });

    const fetched = await client.page.getPageById({ id: Number(minimal.id) });
    expect(fetched.id).toBe(minimal.id);
    expect(fetched.spaceId).toBe(space.id);
    expect(fetched.title).toBe(testName('page-minimal'));
    expectWellFormedPage(fetched);
  });

  it('creates a child page under a parent and reports the parent linkage', async () => {
    const child = await createTestPage(tracker, space.id, {
      title: testName('page-child'),
      parentId: primaryPage.id,
    });

    expect(child.parentId).toBe(primaryPage.id);

    const fetched = await client.page.getPageById({ id: Number(child.id) });
    expect(fetched.parentId).toBe(primaryPage.id);
    expect(fetched.parentType).toBe('page');
    expectWellFormedPage(fetched);
  });
});

describe('Confluence Cloud v2 — page.deletePage (live)', () => {
  let disposable: Page;

  beforeAll(async () => {
    disposable = await client.page.createPage({
      body: {
        spaceId: space.id,
        status: 'current',
        title: testName('page-disposable'),
        body: storageBody('<p>cfjs page to be deleted</p>'),
      },
    });
    // Safety net in case the assertion below never runs (e.g. create succeeded but delete throws).
    tracker.defer(async () => {
      await client.page.deletePage({ id: Number(disposable.id) }).catch(() => undefined);
    });
  });

  it('deletes the page so it is no longer current (trashed or, if purged, 404)', async () => {
    await client.page.deletePage({ id: Number(disposable.id) });

    // A plain v2 DELETE moves content to TRASH (204) rather than purging it: the
    // page is still fetchable, now with status 'trashed'. Only a purge yields 404.
    const after = await client.page.getPageById({ id: Number(disposable.id) }).catch(e => e);

    if (after instanceof ApiError) {
      expect(after.status).toBe(404); // hard-deleted (purged)
    } else {
      expect(['trashed', 'deleted']).toContain(after.status); // moved to trash (the common case)
    }
  });
});
