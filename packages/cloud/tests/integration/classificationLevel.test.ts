import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost } from './setup/fixtures';

/**
 * Live integration suite for the Confluence Cloud v2 `classificationLevel` API.
 *
 * This is a PREMIUM, ENVIRONMENT-GATED module — data classification requires
 * Atlassian Guard / a classification-enabled org. On a standard Cloud site the
 * classification levels list is typically empty and the per-resource
 * classification endpoints return a typed `ApiError` (401/403/404, or 451/501
 * where the feature is entirely unprovisioned). Every method is therefore
 * exercised gated-gracefully: it is CALLED (so request serialization + the Zod
 * `ClassificationLevel` parse are type-checked end to end) and the result is
 * asserted to be either the exact typed shape OR a typed `ApiError`.
 *
 * Coverage:
 *   - DEEP: `getClassificationLevels` + the space-default family
 *     (`get/put/deleteSpaceDefaultClassificationLevel`) against a disposable
 *     fixture space, plus the page family (`get/put/postPageClassificationLevel`)
 *     against a disposable fixture page.
 *   - LIGHT (sibling families, proving they compile + serialize + gate):
 *     blogpost (real fixture id), whiteboard + database (plausible ids) — each
 *     get/put/post invoked once.
 *
 * MUTATIONS (`put*` / `post*reset` / `delete*`) target ONLY the disposable
 * fixtures created here, which are auto-deleted on cleanup.
 *
 * Shared infrastructure (see `./setup` and `./helpers`):
 *   - `getLiveClient()` — singleton v2 client;
 *   - `ResourceTracker` — LIFO teardown;
 *   - `createTestSpace` / `createTestPage` / `createTestBlogPost` — self-cleaning fixtures.
 */

const GATED_STATUSES = [400, 401, 403, 404, 451, 501] as const;
const LEVEL_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;
const LEVEL_COLORS = [
  'RED',
  'RED_BOLD',
  'ORANGE',
  'YELLOW',
  'GREEN',
  'BLUE',
  'NAVY',
  'TEAL',
  'PURPLE',
  'GREY',
  'LIME',
] as const;

/** A non-existent numeric id used to prove the plausible-id sibling families gate cleanly. */
const BOGUS_ID = 999_999_999;

/** The element type of the classification-levels list, derived from the client contract. */
type ClassificationLevel = Awaited<
  ReturnType<ReturnType<typeof createCloudV2Client>['classificationLevel']['getClassificationLevels']>
>[number];

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

let spaceId: number;
let pageId: number;
let blogId: number;
/** Classification levels available on this site — empty when the feature is unprovisioned. */
let levels: ClassificationLevel[] = [];

/** Structural contract check for a single classification level returned by the API. */
function expectWellFormedLevel(level: ClassificationLevel) {
  expect(typeof level).toBe('object');

  if (level.id !== undefined) expect(typeof level.id).toBe('string');

  if (level.name !== undefined) expect(typeof level.name).toBe('string');

  if (level.description !== undefined) expect(typeof level.description).toBe('string');

  if (level.guideline !== undefined) expect(typeof level.guideline).toBe('string');

  if (level.order !== undefined) expect(typeof level.order).toBe('number');

  if (level.status !== undefined) expect(LEVEL_STATUSES).toContain(level.status);

  if (level.color !== undefined) expect(LEVEL_COLORS).toContain(level.color);
}

/** A request body for `put*ClassificationLevel`: the level id to apply, or a placeholder when none exist. */
function applyLevelBody() {
  return { classificationLevelId: levels[0]?.id ?? '00000000-0000-0000-0000-000000000000' };
}

beforeAll(async () => {
  client = getLiveClient();

  const space = await createTestSpace(tracker, 'classif');
  const page = await createTestPage(tracker, space.id, { title: 'classif-page-probe' });
  const blog = await createTestBlogPost(tracker, space.id, { title: 'classif-blog-probe' });

  spaceId = Number(space.id);
  pageId = Number(page.id);
  blogId = Number(blog.id);

  // Discover the site's classification levels once; tolerate the gated case.
  try {
    levels = await client.classificationLevel.getClassificationLevels();
  } catch {
    levels = [];
  }
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — classificationLevel.getClassificationLevels (live, gated-graceful)', () => {
  it('returns a typed array of classification levels, or surfaces a typed ApiError when unprovisioned', async () => {
    try {
      const result = await client.classificationLevel.getClassificationLevels();

      // Always an array (possibly empty on a non-premium site); each member is a
      // well-formed `ClassificationLevel`.
      expect(Array.isArray(result)).toBe(true);
      result.forEach(expectWellFormedLevel);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — classificationLevel space-default family (live, deep, gated-graceful)', () => {
  it('getSpaceDefaultClassificationLevel returns a typed level for the fixture space, or a typed ApiError', async () => {
    try {
      const level = await client.classificationLevel.getSpaceDefaultClassificationLevel({ id: spaceId });
      expectWellFormedLevel(level);
    } catch (error) {
      // 404 here also covers "no default set" on a classification-enabled site.
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });

  it('putSpaceDefaultClassificationLevel sets the disposable space default, or a typed ApiError', async () => {
    try {
      const result = await client.classificationLevel.putSpaceDefaultClassificationLevel({
        id: spaceId,
        body: applyLevelBody(),
      });
      // The endpoint is declared `Promise<void>` — a success resolves with no body.
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });

  it('deleteSpaceDefaultClassificationLevel resets the disposable space default, or a typed ApiError', async () => {
    try {
      const result = await client.classificationLevel.deleteSpaceDefaultClassificationLevel({ id: spaceId });
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — classificationLevel page family (live, deep, gated-graceful)', () => {
  it('getPageClassificationLevel returns a typed level for the fixture page, or a typed ApiError', async () => {
    try {
      const level = await client.classificationLevel.getPageClassificationLevel({ id: pageId, status: 'current' });
      expectWellFormedLevel(level);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });

  it('putPageClassificationLevel sets the disposable page level, or a typed ApiError', async () => {
    try {
      const result = await client.classificationLevel.putPageClassificationLevel({
        id: pageId,
        body: applyLevelBody(),
      });
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });

  it('postPageClassificationLevel resets the disposable page level to the space default, or a typed ApiError', async () => {
    try {
      const result = await client.classificationLevel.postPageClassificationLevel({ id: pageId, body: {} });
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — classificationLevel blogpost family (live, light, gated-graceful)', () => {
  it('get/put/post against the disposable fixture blog post each type, serialize, and gate cleanly', async () => {
    try {
      const level = await client.classificationLevel.getBlogPostClassificationLevel({ id: blogId, status: 'current' });
      expectWellFormedLevel(level);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }

    try {
      await client.classificationLevel.putBlogPostClassificationLevel({ id: blogId, body: applyLevelBody() });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }

    try {
      await client.classificationLevel.postBlogPostClassificationLevel({ id: blogId, body: {} });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — classificationLevel whiteboard family (live, light, gated-graceful)', () => {
  it('get/put/post with a plausible whiteboard id type, serialize, and gate cleanly', async () => {
    try {
      const level = await client.classificationLevel.getWhiteboardClassificationLevel({ id: BOGUS_ID });
      expectWellFormedLevel(level);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }

    try {
      await client.classificationLevel.putWhiteboardClassificationLevel({ id: BOGUS_ID, body: applyLevelBody() });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }

    try {
      await client.classificationLevel.postWhiteboardClassificationLevel({ id: BOGUS_ID, body: {} });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — classificationLevel database family (live, light, gated-graceful)', () => {
  it('get/put/post with a plausible database id type, serialize, and gate cleanly', async () => {
    try {
      const level = await client.classificationLevel.getDatabaseClassificationLevel({ id: BOGUS_ID });
      expectWellFormedLevel(level);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }

    try {
      await client.classificationLevel.putDatabaseClassificationLevel({ id: BOGUS_ID, body: applyLevelBody() });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }

    try {
      await client.classificationLevel.postDatabaseClassificationLevel({ id: BOGUS_ID, body: {} });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});
