import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost, storageBody } from '../setup/fixtures';
import { testName } from '../helpers/naming';

/**
 * Live integration suite for the Confluence Cloud v2 `like` API:
 * `getPageLikeCount`, `getPageLikeUsers`, `getBlogPostLikeCount`, `getBlogPostLikeUsers`,
 * `getFooterLikeCount`, `getFooterLikeUsers`, `getInlineLikeCount`, `getInlineLikeUsers`.
 *
 * v2 exposes NO endpoint to *add* a like, so freshly created content is unliked. The
 * suite therefore verifies the *contract* of each reader rather than a positive count:
 *   - the `*LikeCount` family returns a `{ count }` object whose `count` is a `number >= 0`
 *     (model: `apiObject({ count: z.number().optional() })`);
 *   - the `*LikeUsers` family returns a well-typed result page — a `results` array (likely
 *     empty) plus a `_links` (`MultiEntityLinks`) object — and each entry, when present, is a
 *     `Like` (`{ accountId?: string }`);
 *   - the `id` path param is declared `z.number()` while entity ids are numeric *strings*, so
 *     every call converts with `Number(entity.id)` (the v2 "ID gotcha");
 *   - a non-existent id surfaces as a typed `ApiError`.
 *
 * Bootstrap: one space → one page (carrying a unique anchor phrase) → one blog post → one
 * footer comment on the page → (best-effort) one inline comment anchored to the page phrase.
 * Inline-comment creation can be environment-sensitive, so it is guarded: when it succeeds the
 * inline likes are tested deeply, otherwise they are exercised gated-graceful against a
 * non-existent id (asserting a 404 `ApiError`).
 */

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();

let pageId: number;
let blogPostId: number;
let footerCommentId: number;
/** Set only if the inline comment bootstrap succeeded. */
let inlineCommentId: number | undefined;
/** Captured reason the inline comment could not be created, for the skip message. */
let inlineBootstrapError: unknown;

/** The unique text rendered into the page body and reused as the inline-comment anchor. */
const ANCHOR = `cfjs-like-anchor-${Date.now().toString(36)}`;

/** A `{ count }` like-count payload is well-formed iff `count` is a non-negative number. */
function expectWellFormedLikeCount(payload: { count?: number }) {
  expect(payload).toBeDefined();
  expect(typeof payload.count).toBe('number');
  expect(Number.isFinite(payload.count)).toBe(true);
  expect(payload.count).toBeGreaterThanOrEqual(0);
}

/** A like-users page exposes a `results` array and a `_links` object; entries are typed `Like`. */
function expectWellFormedLikeUsers(page: { results?: { accountId?: string }[]; _links?: unknown }) {
  expect(page).toBeDefined();
  expect(Array.isArray(page.results)).toBe(true);
  expect(page._links).toBeDefined();
  expect(typeof page._links).toBe('object');
  page.results!.forEach(user => {
    // `Like.accountId` is `z.string().optional()`.
    if (user.accountId !== undefined) {
      expect(typeof user.accountId).toBe('string');
      expect(user.accountId.length).toBeGreaterThan(0);
    }
  });
}

beforeAll(async () => {
  client = getV2Client();

  const space = await createTestSpace(tracker);

  const page = await createTestPage(tracker, space.id, {
    html: `<p>cfjs live like test — ${ANCHOR}</p>`,
  });
  pageId = Number(page.id);

  const blogPost = await createTestBlogPost(tracker, space.id);
  blogPostId = Number(blogPost.id);

  const footerComment = await client.comment.createFooterComment({
    pageId: page.id,
    body: storageBody(testName('footer-like-comment')),
  });
  footerCommentId = Number(footerComment.id);
  tracker.defer(async () => {
    await client.comment.deleteFooterComment({ commentId: footerCommentId }).catch(() => undefined);
  });

  // Best-effort inline comment anchored to the unique phrase in the page body. Inline-comment
  // creation depends on the highlight resolving server-side, so failures are tolerated.
  try {
    const inlineComment = await client.comment.createInlineComment({
      pageId: page.id,
      body: storageBody(testName('inline-like-comment')),
      inlineCommentProperties: {
        textSelection: ANCHOR,
        textSelectionMatchCount: 1,
        textSelectionMatchIndex: 0,
      },
    });
    inlineCommentId = Number(inlineComment.id);
    tracker.defer(async () => {
      await client.comment.deleteInlineComment({ commentId: inlineCommentId! }).catch(() => undefined);
    });
  } catch (error) {
    inlineBootstrapError = error;
  }
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — like.getPageLikeCount (live)', () => {
  it('returns a non-negative numeric like count for a fresh, unliked page', async () => {
    const result = await client.like.getPageLikeCount({ id: pageId });

    expectWellFormedLikeCount(result);
    // No v2 add-like endpoint exists, so a brand-new page must have zero likes.
    expect(result.count).toBe(0);
  });

  it('rejects a non-existent page id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.like.getPageLikeCount({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — like.getPageLikeUsers (live)', () => {
  it('returns a well-typed (and, for an unliked page, empty) users page', async () => {
    const page = await client.like.getPageLikeUsers({ id: pageId });

    expectWellFormedLikeUsers(page);
    expect(page.results).toHaveLength(0);
  });

  it('honors the `limit` query parameter', async () => {
    const page = await client.like.getPageLikeUsers({ id: pageId, limit: 1 });

    expectWellFormedLikeUsers(page);
    expect(page.results!.length).toBeLessThanOrEqual(1);
  });

  it('is consistent with the like count (no users ⇒ zero count)', async () => {
    const [users, count] = await Promise.all([
      client.like.getPageLikeUsers({ id: pageId }),
      client.like.getPageLikeCount({ id: pageId }),
    ]);

    expect(users.results!.length).toBe(count.count);
  });
});

describe('Confluence Cloud v2 — like.getBlogPostLikeCount (live)', () => {
  it('returns a non-negative numeric like count for a fresh blog post', async () => {
    const result = await client.like.getBlogPostLikeCount({ id: blogPostId });

    expectWellFormedLikeCount(result);
    expect(result.count).toBe(0);
  });

  it('rejects a non-existent blog post id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.like.getBlogPostLikeCount({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — like.getBlogPostLikeUsers (live)', () => {
  it('returns a well-typed, empty users page for a fresh blog post', async () => {
    const page = await client.like.getBlogPostLikeUsers({ id: blogPostId });

    expectWellFormedLikeUsers(page);
    expect(page.results).toHaveLength(0);
  });

  it('honors the `limit` query parameter', async () => {
    const page = await client.like.getBlogPostLikeUsers({ id: blogPostId, limit: 1 });

    expectWellFormedLikeUsers(page);
    expect(page.results!.length).toBeLessThanOrEqual(1);
  });
});

describe('Confluence Cloud v2 — like.getFooterLikeCount (live)', () => {
  it('returns a non-negative numeric like count for a fresh footer comment', async () => {
    const result = await client.like.getFooterLikeCount({ id: footerCommentId });

    expectWellFormedLikeCount(result);
    expect(result.count).toBe(0);
  });

  it('rejects a non-existent footer comment id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.like.getFooterLikeCount({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — like.getFooterLikeUsers (live)', () => {
  it('returns a well-typed, empty users page for a fresh footer comment', async () => {
    const page = await client.like.getFooterLikeUsers({ id: footerCommentId });

    expectWellFormedLikeUsers(page);
    expect(page.results).toHaveLength(0);
  });

  it('is consistent with the footer like count', async () => {
    const [users, count] = await Promise.all([
      client.like.getFooterLikeUsers({ id: footerCommentId }),
      client.like.getFooterLikeCount({ id: footerCommentId }),
    ]);

    expect(users.results!.length).toBe(count.count);
  });
});

describe('Confluence Cloud v2 — like.getInlineLikeCount / getInlineLikeUsers (live)', () => {
  it('reads the inline like count + users for a created inline comment, or 404s on a bogus id', async () => {
    if (inlineCommentId === undefined) {
      // Inline-comment bootstrap failed in this environment; still exercise typing +
      // serialization and assert the failure is a typed 404 ApiError.

      console.warn('like.test: inline comment bootstrap unavailable, falling back to 404 check', inlineBootstrapError);

      let caught: unknown;
      try {
        await client.like.getInlineLikeCount({ id: 999_999_999 });
      } catch (error) {
        caught = error;
      }
      expect(caught).toBeInstanceOf(ApiError);
      expect((caught as ApiError).status).toBe(404);

      let caughtUsers: unknown;
      try {
        await client.like.getInlineLikeUsers({ id: 999_999_999 });
      } catch (error) {
        caughtUsers = error;
      }
      expect(caughtUsers).toBeInstanceOf(ApiError);
      expect((caughtUsers as ApiError).status).toBe(404);

      return;
    }

    const count = await client.like.getInlineLikeCount({ id: inlineCommentId });
    expectWellFormedLikeCount(count);
    expect(count.count).toBe(0);

    const users = await client.like.getInlineLikeUsers({ id: inlineCommentId });
    expectWellFormedLikeUsers(users);
    expect(users.results).toHaveLength(0);

    // Cross-endpoint consistency: an unliked inline comment has no users and a zero count.
    expect(users.results!.length).toBe(count.count);
  });

  it('honors the `limit` query parameter on getInlineLikeUsers when an inline comment exists', async () => {
    if (inlineCommentId === undefined) return;

    const users = await client.like.getInlineLikeUsers({ id: inlineCommentId, limit: 1 });

    expectWellFormedLikeUsers(users);
    expect(users.results!.length).toBeLessThanOrEqual(1);
  });
});
