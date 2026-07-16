import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost, storageBody } from './setup/fixtures';
import { testName } from './helpers/naming';
import { waitFor } from './helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `customContent` API
 * (`createCustomContent`, `getCustomContentById`, `updateCustomContent`,
 * `deleteCustomContent`, `getCustomContentByType`, `getCustomContentByTypeInSpace`,
 * `getCustomContentByTypeInPage`, `getCustomContentByTypeInBlogPost`).
 *
 * CENTRAL NARRATIVE — this module is ENVIRONMENT-GATED. Custom content `type`s are
 * registered by a Forge/Connect app module (`forge:*` / `connect:*`). On a plain
 * Cloud site with no such app installed, `createCustomContent` with an arbitrary
 * type is typically rejected (400/403/404). The suite therefore *always attempts*
 * a create to exercise serialization, then BRANCHES:
 *
 *   - CREATE SUCCEEDED  → full CRUD contract: read-back consistency + typed fields,
 *     version-bumping update, type/space-scoped listings include it, delete →
 *     subsequent getById 404s.
 *   - CREATE GATED      → assert the failure is a typed `ApiError` with an expected
 *     status, then still CALL every getter (with a real `type` query + container id)
 *     and assert each resolves to a typed (usually empty) page or a typed `ApiError`,
 *     and that getById/update/delete on a non-existent id surface a typed `ApiError`.
 *     This keeps every exported method exercised for typing + serialization.
 *
 * Source-of-truth shapes: `src/api/customContent.ts`, `src/parameters/*CustomContent*.ts`,
 * `src/models/customContent.ts` + `customContentSummary.ts`. ID gotcha: model ids are
 * numeric `string`s but path-id params are `z.number()` — converted via `Number(id)`.
 */

const TYPE = 'forge:cfjs-live-test';

/** `ContentStatusSchema` enum — the only values `status` may legally take. */
const CONTENT_STATUSES = ['current', 'draft', 'archived', 'historical', 'trashed', 'deleted', 'any'] as const;

/** Statuses a standard Cloud site plausibly returns when the custom content type is not registered. */
const GATED_STATUSES = [400, 403, 404, 501] as const;

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

let space: Awaited<ReturnType<typeof createTestSpace>>;
let page: Awaited<ReturnType<typeof createTestPage>>;
let blog: Awaited<ReturnType<typeof createTestBlogPost>>;

type CustomContentEntity = Awaited<ReturnType<typeof client.customContent.getCustomContentById>>;
type CustomContentSummary = NonNullable<
  Awaited<ReturnType<typeof client.customContent.getCustomContentByType>>['results']
>[number];

/** Set iff `createCustomContent` succeeded (the type is registered on this site). */
let created: CustomContentEntity | null = null;
/** Set iff `createCustomContent` was rejected (the gated path). */
let createError: unknown = null;

const ccTitle = testName('custom-content');

/** A summary returned by any of the list endpoints must be typed as the model declares. */
function expectWellFormedCustomContent(cc: CustomContentSummary) {
  expect(typeof cc.id).toBe('string');
  expect(cc.id).toBeTruthy();
  expect(typeof cc.type).toBe('string');
  expect(cc.type).toBeTruthy();
  // `spaceId` is documented as always returned, regardless of container.
  expect(typeof cc.spaceId).toBe('string');

  if (cc.status !== undefined) expect(CONTENT_STATUSES).toContain(cc.status);

  // `createdAt` is `z.coerce.date()` — a parsed response yields a real Date.
  if (cc.createdAt !== undefined) expect(cc.createdAt).toBeInstanceOf(Date);
}

/**
 * Call a list endpoint and assert the response is a typed page: `results` (when
 * present) is an array of well-formed summaries. In the gated environment the
 * endpoint may instead reject — that is accepted as a typed `ApiError`. Returns the
 * page on success (for inclusion assertions), or `null` if it surfaced an ApiError.
 */
async function callListing(
  call: () => Promise<{ results?: CustomContentSummary[]; _links?: unknown }>,
): Promise<{ results?: CustomContentSummary[]; _links?: unknown } | null> {
  try {
    const pageResult = await call();
    expect(Array.isArray(pageResult.results ?? [])).toBe(true)
    ;(pageResult.results ?? []).forEach(expectWellFormedCustomContent);

    return pageResult;
  } catch (error) {
    expect(error).toBeInstanceOf(ApiError);
    expect(GATED_STATUSES).toContain((error as ApiError).status);

    return null;
  }
}

beforeAll(async () => {
  client = getLiveClient();

  space = await createTestSpace(tracker);
  page = await createTestPage(tracker, space.id);
  blog = await createTestBlogPost(tracker, space.id);

  // Always attempt creation — exercises param/body serialization either way.
  // Container = the space (`spaceId`), so the content is reachable via the
  // type-scoped and space-scoped listings (per the model, `spaceId` is always
  // returned), but NOT via the page/blogpost listings.
  try {
    created = await client.customContent.createCustomContent({
      body: {
        type: TYPE,
        status: 'current',
        spaceId: space.id,
        title: ccTitle,
        body: storageBody('<p>cc</p>'),
      },
    });

    const id = Number(created.id);
    tracker.defer(async () => {
      await client.customContent.deleteCustomContent({ id, purge: true }).catch(() => undefined);
    });
  } catch (error) {
    createError = error;
  }
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — customContent.createCustomContent (live, gated)', () => {
  it('either creates typed custom content or rejects with a typed ApiError', () => {
    if (created) {
      expect(typeof created.id).toBe('string');
      expect(created.id).toBeTruthy();
      expect(created.type).toBe(TYPE);
      expect(created.title).toBe(ccTitle);
      // `spaceId` is always returned and must echo the container space.
      expect(created.spaceId).toBe(space.id);
      expect(CONTENT_STATUSES).toContain(created.status);
      expect(created.createdAt).toBeInstanceOf(Date);
      // A freshly created entity is version 1.
      expect(created.version?.number).toBe(1);
      expect(typeof created.authorId).toBe('string');

      return;
    }

    // Gated path — creation rejected because the type is not registered here.
    expect(createError, 'create neither succeeded nor threw').toBeInstanceOf(ApiError);
    expect(GATED_STATUSES).toContain((createError as ApiError).status);
  });
});

describe('Confluence Cloud v2 — customContent.getCustomContentById (live)', () => {
  it('returns the canonical entity created above with model-typed fields', async () => {
    if (!created) return; // covered by the dedicated 404 case below in the gated path

    const fetched = await client.customContent.getCustomContentById({ id: Number(created.id) });

    expect(fetched.id).toBe(created.id);
    expect(fetched.type).toBe(TYPE);
    expect(fetched.title).toBe(ccTitle);
    expect(fetched.spaceId).toBe(space.id);
    expect(CONTENT_STATUSES).toContain(fetched.status);
    expect(fetched.createdAt).toBeInstanceOf(Date);
    expect(fetched.version?.number).toBe(1);
    // No `pageId`/`blogPostId` since the container is a space.
    expect(fetched.pageId).toBeUndefined();
    expect(fetched.blogPostId).toBeUndefined();
  });

  it('returns the requested body representation when `body-format` is set', async () => {
    if (!created) return;

    const fetched = await client.customContent.getCustomContentById({
      id: Number(created.id),
      bodyFormat: 'storage',
    });

    expect(fetched.body).toBeDefined();
    expect(fetched.body?.storage).toBeDefined();
    expect(fetched.body?.storage?.representation).toBe('storage');
    expect(typeof fetched.body?.storage?.value).toBe('string');
  });

  it('expands labels/properties/operations only when the include-* flags are set', async () => {
    if (!created) return;

    const expanded = await client.customContent.getCustomContentById({
      id: Number(created.id),
      includeLabels: true,
      includeProperties: true,
      includeOperations: true,
    });

    expect(expanded.labels).toBeDefined();
    expect(Array.isArray(expanded.labels?.results ?? [])).toBe(true);
    expect(expanded.properties).toBeDefined();
    expect(Array.isArray(expanded.properties?.results ?? [])).toBe(true);
    expect(expanded.operations).toBeDefined();
    expect(Array.isArray(expanded.operations?.results ?? [])).toBe(true);
  });

  it('rejects a non-existent custom content id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.customContent.getCustomContentById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — customContent.updateCustomContent (live)', () => {
  it('bumps the version and applies the new title (or surfaces a typed ApiError when gated)', async () => {
    if (!created) {
      // Gated path — exercise the method's serialization against a missing entity.
      let caught: unknown;
      try {
        await client.customContent.updateCustomContent({
          id: 999_999_999,
          body: {
            id: '999999999',
            type: TYPE,
            status: 'current',
            title: ccTitle,
            body: storageBody('<p>cc</p>'),
            version: { number: 2 },
          },
        });
      } catch (error) {
        caught = error;
      }
      expect(caught).toBeInstanceOf(ApiError);
      expect([400, 403, 404]).toContain((caught as ApiError).status);

      return;
    }

    const current = await client.customContent.getCustomContentById({ id: Number(created.id) });
    const nextVersion = (current.version?.number ?? 1) + 1;
    const newTitle = testName('custom-content-updated');

    const updated = await client.customContent.updateCustomContent({
      id: Number(created.id),
      body: {
        id: created.id,
        type: TYPE,
        status: 'current',
        title: newTitle,
        spaceId: space.id,
        body: storageBody('<p>cc updated</p>'),
        version: { number: nextVersion },
      },
    });

    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe(newTitle);
    expect(updated.version?.number).toBe(nextVersion);

    // The bump is observable on a fresh read.
    const reread = await client.customContent.getCustomContentById({ id: Number(created.id) });
    expect(reread.title).toBe(newTitle);
    expect(reread.version?.number).toBe(nextVersion);
  });
});

describe('Confluence Cloud v2 — customContent.getCustomContentByType (live)', () => {
  it('returns a typed page and (when created) contains the new content filtered by space', async () => {
    const result = await callListing(() =>
      client.customContent.getCustomContentByType({ type: TYPE, spaceId: [Number(space.id)], limit: 50 }),
    );

    if (created && result) {
      const found = await waitFor(
        () => client.customContent.getCustomContentByType({ type: TYPE, spaceId: [Number(space.id)], limit: 50 }),
        r => (r.results ?? []).some(c => c.id === created!.id),
      );
      const match = found.results!.find(c => c.id === created!.id)!;
      expect(match.type).toBe(TYPE);
      expect(match.spaceId).toBe(space.id);
    }
  });
});

describe('Confluence Cloud v2 — customContent.getCustomContentByTypeInSpace (live)', () => {
  it('returns a typed page for the space and (when created) contains the new content', async () => {
    const result = await callListing(() =>
      client.customContent.getCustomContentByTypeInSpace({ id: Number(space.id), type: TYPE, limit: 50 }),
    );

    if (created && result) {
      const found = await waitFor(
        () => client.customContent.getCustomContentByTypeInSpace({ id: Number(space.id), type: TYPE, limit: 50 }),
        r => (r.results ?? []).some(c => c.id === created!.id),
      );
      expect(found.results!.some(c => c.id === created!.id)).toBe(true);
    }
  });
});

describe('Confluence Cloud v2 — customContent.getCustomContentByTypeInPage (live)', () => {
  it('returns a typed page for the page (space-container content is absent here)', async () => {
    const result = await callListing(() =>
      client.customContent.getCustomContentByTypeInPage({ id: Number(page.id), type: TYPE, limit: 50 }),
    );

    // Container is the space, not this page, so the created item must NOT appear.
    if (created && result) {
      expect((result.results ?? []).some(c => c.id === created!.id)).toBe(false);
    }
  });
});

describe('Confluence Cloud v2 — customContent.getCustomContentByTypeInBlogPost (live)', () => {
  it('returns a typed page for the blog post (space-container content is absent here)', async () => {
    const result = await callListing(() =>
      client.customContent.getCustomContentByTypeInBlogPost({ id: Number(blog.id), type: TYPE, limit: 50 }),
    );

    if (created && result) {
      expect((result.results ?? []).some(c => c.id === created!.id)).toBe(false);
    }
  });
});

describe('Confluence Cloud v2 — customContent.deleteCustomContent (live)', () => {
  it('deletes the content so a later getById 404s (or surfaces a typed ApiError when gated)', async () => {
    if (!created) {
      // Gated path — exercise delete serialization against a missing entity.
      let caught: unknown;
      try {
        await client.customContent.deleteCustomContent({ id: 999_999_999 });
      } catch (error) {
        caught = error;
      }
      expect(caught).toBeInstanceOf(ApiError);
      expect([400, 403, 404]).toContain((caught as ApiError).status);

      return;
    }

    // Move to trash, then purge so the read below is unambiguously a 404.
    await client.customContent.deleteCustomContent({ id: Number(created.id) });
    await client.customContent.deleteCustomContent({ id: Number(created.id), purge: true }).catch(() => undefined);

    const gone = await waitFor(
      async () => {
        try {
          await client.customContent.getCustomContentById({ id: Number(created!.id) });

          return null;
        } catch (error) {
          return error;
        }
      },
      err => err instanceof ApiError && err.status === 404,
    );

    expect(gone).toBeInstanceOf(ApiError);
    expect((gone as ApiError).status).toBe(404);
  });
});
