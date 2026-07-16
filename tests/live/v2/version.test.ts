import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost, storageBody } from '../setup/fixtures';

/**
 * Live integration suite for the Confluence Cloud v2 `version` API.
 *
 * The module is a fan of structurally-identical read endpoints over six content
 * families (page, blog post, attachment, custom content, footer comment, inline
 * comment): a `get<X>Versions` listing returning a `*Versions` page, and a
 * `get<X>VersionDetails` returning the shared `DetailedVersion`.
 *
 * Strategy (see the suite brief):
 *   - **page** — DEEP. A page is mutated to a 2nd version, then `getPageVersions`
 *     is verified for typing (`number` numeric, `createdAt` Date, `authorId`
 *     string, `minorEdit` boolean), completeness (numbers are exactly 1..N),
 *     ordering (the `sort` param produces mirror orderings), and pagination
 *     (`limit` + `_links.next`); `getPageVersionDetails` is fetched for both
 *     versions and cross-checked (returned `number` matches the request, the v2
 *     details point back at v1 via `prevVersion`).
 *   - **blog post** & **footer comment** & **inline comment** — exercised with a
 *     real create+update so each listing has >= 2 versions and each details call
 *     resolves to the requested version number.
 *   - **attachment** & **custom content** — gated-graceful: no cheap parent, so
 *     each method is still CALLED (to exercise typing + URL/serialization) and is
 *     asserted to either return a typed result page or surface a 404 `ApiError`.
 *
 * Every version summary (`PageVersion`, `BlogPostVersion`, `CommentVersion`) and
 * the `DetailedVersion` declare `number` as `z.number()`, `createdAt` as
 * `z.coerce.date()`, `authorId` as `z.string()`, `minorEdit` as `z.boolean()`.
 */

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();

/** Shared subjects, each already bumped to version 2 in `beforeAll`. */
let page: Awaited<ReturnType<typeof client.page.createPage>>;
let blogPost: Awaited<ReturnType<typeof client.blogPost.createBlogPost>>;
let footerComment: Awaited<ReturnType<typeof client.comment.createFooterComment>>;
/** Inline-comment creation is more fragile (needs a text selection); may stay undefined. */
let inlineCommentId: number | undefined;

/**
 * A meaningful structural check for a version summary as returned by any of the
 * `get<X>Versions` listings (the page/blog/comment summaries share this shape).
 */
function expectWellFormedVersion(version: {
  number?: number;
  createdAt?: Date;
  authorId?: string;
  minorEdit?: boolean;
  message?: string;
}) {
  expect(typeof version.number).toBe('number');
  expect(version.number).toBeGreaterThanOrEqual(1);
  // `createdAt` is `z.coerce.date()`, so a parsed response yields a real Date.
  expect(version.createdAt).toBeInstanceOf(Date);
  expect(Number.isNaN(version.createdAt!.getTime())).toBe(false);
  expect(typeof version.authorId).toBe('string');
  expect(version.authorId).toBeTruthy();
  expect(typeof version.minorEdit).toBe('boolean');
}

beforeAll(async () => {
  client = getV2Client();

  const space = await createTestSpace(tracker);

  // --- page: create (v1) then mutate to v2 -------------------------------
  page = await createTestPage(tracker, space.id, { html: '<p>cfjs version anchor text v1</p>' });
  const pageV1 = page.version?.number ?? 1;
  await client.page.updatePage({
    id: Number(page.id),
    body: {
      id: page.id,
      status: 'current',
      title: page.title,
      body: storageBody('<p>cfjs version anchor text v2</p>'),
      version: { number: pageV1 + 1 },
    },
  });

  // --- blog post: create (v1) then mutate to v2 --------------------------
  blogPost = await createTestBlogPost(tracker, space.id, { html: '<p>cfjs blog v1</p>' });
  const blogV1 = blogPost.version?.number ?? 1;
  await client.blogPost.updateBlogPost({
    id: Number(blogPost.id),
    body: {
      id: blogPost.id,
      status: 'current',
      title: blogPost.title,
      body: storageBody('<p>cfjs blog v2</p>'),
      version: { number: blogV1 + 1 },
    },
  });

  // --- footer comment: create (v1) then mutate to v2 ---------------------
  footerComment = await client.comment.createFooterComment({
    pageId: page.id,
    body: storageBody('<p>cfjs footer comment v1</p>'),
  });
  tracker.defer(async () => {
    await client.comment.deleteFooterComment({ commentId: Number(footerComment.id) }).catch(() => undefined);
  });
  await client.comment.updateFooterComment({
    commentId: Number(footerComment.id),
    body: {
      version: { number: (footerComment.version?.number ?? 1) + 1 },
      body: storageBody('<p>cfjs footer comment v2</p>'),
    },
  });

  // --- inline comment: best-effort create+update (needs a text selection) -
  try {
    const inline = await client.comment.createInlineComment({
      pageId: page.id,
      body: storageBody('<p>cfjs inline v1</p>'),
      inlineCommentProperties: { textSelection: 'anchor', textSelectionMatchCount: 1, textSelectionMatchIndex: 0 },
    });
    inlineCommentId = Number(inline.id);
    tracker.defer(async () => {
      await client.comment.deleteInlineComment({ commentId: Number(inline.id) }).catch(() => undefined);
    });
    await client.comment.updateInlineComment({
      commentId: Number(inline.id),
      version: { number: (inline.version?.number ?? 1) + 1 },
      body: storageBody('<p>cfjs inline v2</p>'),
    });
  } catch {
    // Highlighting can fail if the selection doesn't resolve on the rendered
    // page; the inline-version endpoints are then exercised gated-graceful.
    inlineCommentId = undefined;
  }
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — version.getPageVersions (live, deep)', () => {
  it('lists every version with correctly-typed summaries and complete 1..N numbering', async () => {
    const result = await client.version.getPageVersions({ id: Number(page.id) });

    expect(Array.isArray(result.results)).toBe(true);
    const versions = result.results!;
    expect(versions.length).toBeGreaterThanOrEqual(2);
    versions.forEach(expectWellFormedVersion);

    // The full set of version numbers is exactly 1..N with no gaps/dupes.
    const numbers = versions.map(v => v.number!).sort((a, b) => a - b);
    const expected = Array.from({ length: versions.length }, (_, i) => i + 1);
    expect(numbers).toEqual(expected);

    // The `page` back-reference, when present, points at the same page.
    const withEntity = versions.find(v => v.page != null);

    if (withEntity?.page) {
      expect(withEntity.page.id).toBe(page.id);
    }

    // Multi-entity links object is present on the listing.
    expect(result._links).toBeDefined();
  });

  it('applies `sort` direction — modified-date asc and desc are mirror orderings', async () => {
    const asc = (await client.version.getPageVersions({ id: Number(page.id), sort: 'modified-date' })).results ?? [];
    const desc = (await client.version.getPageVersions({ id: Number(page.id), sort: '-modified-date' })).results ?? [];

    const ascNumbers = asc.map(v => v.number);
    const descNumbers = desc.map(v => v.number);

    expect(ascNumbers.length).toBe(desc.length);
    expect(ascNumbers.length).toBeGreaterThanOrEqual(2);
    // A correct sort param simply makes the two directions exact reverses.
    expect(ascNumbers).toEqual([...descNumbers].reverse());
  });

  it('honors `limit` and surfaces a pagination cursor when more versions exist', async () => {
    const firstPage = await client.version.getPageVersions({ id: Number(page.id), limit: 1 });

    expect(firstPage.results?.length ?? 0).toBeLessThanOrEqual(1);
    expect(firstPage.results).toHaveLength(1);
    // With >1 versions and a page size of 1, the `Link` cursor is surfaced.
    expect(typeof firstPage._links?.next).toBe('string');
    expect(firstPage._links!.next!.length).toBeGreaterThan(0);
  });

  it('serializes the `body-format` param without breaking the typed response', async () => {
    const result = await client.version.getPageVersions({ id: Number(page.id), bodyFormat: 'storage' });

    expect(result.results!.length).toBeGreaterThanOrEqual(2);
    result.results!.forEach(expectWellFormedVersion);
  });

  it('rejects a non-existent page id with a 404 ApiError', async () => {
    let caught: unknown;
    try {
      await client.version.getPageVersions({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — version.getPageVersionDetails (live, deep)', () => {
  it('returns the requested version, with cross-version links between v1 and v2', async () => {
    const v1 = await client.version.getPageVersionDetails({ pageId: Number(page.id), versionNumber: 1 });
    const v2 = await client.version.getPageVersionDetails({ pageId: Number(page.id), versionNumber: 2 });

    expect(v1.number).toBe(1);
    expect(v2.number).toBe(2);
    expect(typeof v1.authorId).toBe('string');
    expect(typeof v2.minorEdit).toBe('boolean');
    expect(v1.createdAt).toBeInstanceOf(Date);
    expect(v2.createdAt).toBeInstanceOf(Date);

    // DetailedVersion exposes prev/next links: v2 was published after v1.
    expect(v2.prevVersion).toBe(1);
    expect(v2.createdAt!.getTime()).toBeGreaterThanOrEqual(v1.createdAt!.getTime());
  });

  it('rejects a non-existent version number with a 404 ApiError', async () => {
    let caught: unknown;
    try {
      await client.version.getPageVersionDetails({ pageId: Number(page.id), versionNumber: 9_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — version blog-post family (live)', () => {
  it('getBlogPostVersions lists >= 2 typed versions numbered 1..N', async () => {
    const result = await client.version.getBlogPostVersions({ id: Number(blogPost.id) });

    const versions = result.results!;
    expect(versions.length).toBeGreaterThanOrEqual(2);
    versions.forEach(expectWellFormedVersion);

    const numbers = versions.map(v => v.number!).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: versions.length }, (_, i) => i + 1));
  });

  it('getBlogPostVersionDetails returns the requested version number', async () => {
    const details = await client.version.getBlogPostVersionDetails({ blogpostId: Number(blogPost.id), versionNumber: 2 });

    expect(details.number).toBe(2);
    expect(details.prevVersion).toBe(1);
    expect(typeof details.authorId).toBe('string');
    expect(details.createdAt).toBeInstanceOf(Date);
  });
});

describe('Confluence Cloud v2 — version footer-comment family (live)', () => {
  it('getFooterCommentVersions lists >= 2 typed versions numbered 1..N', async () => {
    const result = await client.version.getFooterCommentVersions({ id: Number(footerComment.id) });

    const versions = result.results!;
    expect(versions.length).toBeGreaterThanOrEqual(2);
    versions.forEach(expectWellFormedVersion);

    const numbers = versions.map(v => v.number!).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: versions.length }, (_, i) => i + 1));

    // CommentVersion carries a `comment` back-reference to the same comment.
    const withEntity = versions.find(v => v.comment != null);

    if (withEntity?.comment) {
      expect(withEntity.comment.id).toBe(footerComment.id);
    }
  });

  it('getFooterCommentVersionDetails returns the requested version number', async () => {
    const details = await client.version.getFooterCommentVersionDetails({
      id: Number(footerComment.id),
      versionNumber: 2,
    });

    expect(details.number).toBe(2);
    expect(details.prevVersion).toBe(1);
    expect(typeof details.authorId).toBe('string');
    expect(details.createdAt).toBeInstanceOf(Date);
  });
});

describe('Confluence Cloud v2 — version inline-comment family (live)', () => {
  it('getInlineCommentVersions lists typed versions (or 404s for an unknown id)', async () => {
    if (inlineCommentId === undefined) {
      // No inline comment could be created — exercise typing + 404 path only.
      let caught: unknown;
      try {
        const result = await client.version.getInlineCommentVersions({ id: 999_999_999 });
        expect(Array.isArray(result.results)).toBe(true);
        result.results!.forEach(expectWellFormedVersion);

        return;
      } catch (error) {
        caught = error;
      }
      expect(caught).toBeInstanceOf(ApiError);
      expect((caught as ApiError).status).toBe(404);

      return;
    }

    const result = await client.version.getInlineCommentVersions({ id: inlineCommentId });
    const versions = result.results!;
    expect(versions.length).toBeGreaterThanOrEqual(2);
    versions.forEach(expectWellFormedVersion);
    const numbers = versions.map(v => v.number!).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: versions.length }, (_, i) => i + 1));
  });

  it('getInlineCommentVersionDetails returns the requested version (or 404s for an unknown id)', async () => {
    if (inlineCommentId === undefined) {
      let caught: unknown;
      try {
        await client.version.getInlineCommentVersionDetails({ id: 999_999_999, versionNumber: 1 });
      } catch (error) {
        caught = error;
      }
      expect(caught).toBeInstanceOf(ApiError);
      expect((caught as ApiError).status).toBe(404);

      return;
    }

    const details = await client.version.getInlineCommentVersionDetails({ id: inlineCommentId, versionNumber: 2 });
    expect(details.number).toBe(2);
    expect(typeof details.authorId).toBe('string');
    expect(details.createdAt).toBeInstanceOf(Date);
  });
});

describe('Confluence Cloud v2 — version attachment family (live, gated-graceful)', () => {
  // No cheap attachment parent exists in v2 (upload is a v1 multipart gap), so
  // these calls exercise typing + URL/serialization and tolerate a 404.
  const missingAttachmentId = '999999999';

  it('getAttachmentVersions returns a typed page or a 404 ApiError', async () => {
    let caught: unknown;
    try {
      const result = await client.version.getAttachmentVersions({ id: missingAttachmentId });
      expect(Array.isArray(result.results)).toBe(true);
      result.results!.forEach(expectWellFormedVersion);

      return;
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });

  it('getAttachmentVersionDetails returns a typed version or a 404 ApiError', async () => {
    let caught: unknown;
    try {
      const details = await client.version.getAttachmentVersionDetails({
        attachmentId: missingAttachmentId,
        versionNumber: 1,
      });
      expect(details).toBeDefined();

      return;
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — version custom-content family (live, gated-graceful)', () => {
  // Likewise no custom-content parent is bootstrapped here.
  const missingCustomContentId = 999_999_999;

  it('getCustomContentVersions returns a typed page or a 404 ApiError', async () => {
    let caught: unknown;
    try {
      const result = await client.version.getCustomContentVersions({ customContentId: missingCustomContentId });
      expect(Array.isArray(result.results)).toBe(true);
      result.results!.forEach(expectWellFormedVersion);

      return;
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });

  it('getCustomContentVersionDetails returns a typed version or a 404 ApiError', async () => {
    let caught: unknown;
    try {
      const details = await client.version.getCustomContentVersionDetails({
        customContentId: missingCustomContentId,
        versionNumber: 1,
      });
      expect(details).toBeDefined();

      return;
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});
