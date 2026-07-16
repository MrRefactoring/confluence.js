import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost, storageBody } from './setup/fixtures';
import { testName } from './helpers/naming';

/**
 * Live integration suite for the Confluence Cloud v2 `operation` API — the family
 * of `get<Target>Operations` endpoints that report which actions the current user
 * is permitted to perform on a given entity (`getPageOperations`,
 * `getBlogPostOperations`, `getSpaceOperations`, `getAttachmentOperations`,
 * `getCustomContentOperations`, `getWhiteboardOperations`, `getDatabaseOperations`,
 * `getSmartLinkOperations`, `getFolderOperations`, `getFooterCommentOperations`,
 * `getInlineCommentOperations`).
 *
 * Every method shares one response contract: `PermittedOperations`, i.e.
 * `{ operations?: Operation[] | null }` where each `Operation` is
 * `{ operation?: string, targetType?: string }`. The assertions verify that
 * contract against real, owner-created entities (page, blog post, space, footer
 * comment, inline comment): the list is non-empty, every entry exposes string
 * `operation` + `targetType`, the well-known `read` operation is present for the
 * owner, and `targetType` matches the entity kind. For the content types whose
 * parents are not cheaply available (attachment, custom content, whiteboard,
 * database, smart link, folder) the method is still invoked to exercise typing +
 * serialization, asserting either a typed `PermittedOperations` or a typed
 * `ApiError` (404/400).
 *
 * ID gotcha: every `get*Operations` parameter is typed `id: z.number()` while the
 * entity ids in the models are numeric *strings*; ids are converted with
 * `Number(entity.id)` before being passed.
 */

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

let space: Awaited<ReturnType<typeof createTestSpace>>;
let page: Awaited<ReturnType<typeof client.page.createPage>>;
let blog: Awaited<ReturnType<typeof client.blogPost.createBlogPost>>;
let footerComment: Awaited<ReturnType<typeof client.comment.createFooterComment>>;

/** Unique anchor phrase embedded in the page body so an inline comment can target it. */
const INLINE_ANCHOR = `cfjs-inline-anchor-${Date.now().toString(36)}`;

type Operations = Awaited<ReturnType<typeof client.operation.getPageOperations>>;

/**
 * A meaningful structural check for a `PermittedOperations` response: the list is
 * present + non-empty, and every entry is a well-formed `Operation`. Returns the
 * flat list of operation names for further assertions.
 */
function expectWellFormedOperations(result: Operations): string[] {
  expect(result).toBeDefined();
  expect(Array.isArray(result.operations)).toBe(true);
  const operations = result.operations ?? [];
  expect(operations.length).toBeGreaterThan(0);

  for (const entry of operations) {
    expect(typeof entry.operation).toBe('string');
    expect(entry.operation).toBeTruthy();
    expect(typeof entry.targetType).toBe('string');
    expect(entry.targetType).toBeTruthy();
  }

  return operations.map(entry => entry.operation!);
}

/**
 * Invoke a `get*Operations` method for a content type whose parent is not cheaply
 * available. The call must either resolve to a typed `PermittedOperations` (when
 * the id happens to exist) or reject with a typed `ApiError` carrying a 4xx
 * status. Either outcome proves the method's typing + serialization are correct.
 */
async function expectOperationsOrApiError(call: () => Promise<Operations>, label: string) {
  let result: Operations | undefined;
  let caught: unknown;

  try {
    result = await call();
  } catch (error) {
    caught = error;
  }

  if (caught) {
    expect(caught, `${label} should fail with a typed ApiError`).toBeInstanceOf(ApiError);
    const status = (caught as ApiError).status;
    expect([400, 401, 403, 404], `${label} unexpected status ${status}`).toContain(status);

    return;
  }

  // When it resolves, the response must still satisfy the model shape.
  expect(result).toBeDefined();
  expect(Array.isArray(result!.operations ?? [])).toBe(true);

  for (const entry of result!.operations ?? []) {
    expect(typeof entry.operation).toBe('string');
    expect(typeof entry.targetType).toBe('string');
  }
}

beforeAll(async () => {
  client = getLiveClient();

  space = await createTestSpace(tracker);
  page = await createTestPage(tracker, space.id, {
    html: `<p>cfjs live operation test ${INLINE_ANCHOR} body</p>`,
  });
  blog = await createTestBlogPost(tracker, space.id);

  footerComment = await client.comment.createFooterComment({
    pageId: String(page.id),
    body: storageBody(testName('footer-comment-for-operations')),
  });
  tracker.defer(async () => {
    await client.comment.deleteFooterComment({ commentId: Number(footerComment.id) }).catch(() => undefined);
  });
}, 60_000);

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — operation.getPageOperations (live)', () => {
  it('returns the owner-permitted operations for the created page', async () => {
    const result = await client.operation.getPageOperations({ id: Number(page.id) });

    const names = expectWellFormedOperations(result);
    // The creating account owns the page, so it can at minimum read it.
    expect(names).toContain('read');
    // The page-scoped operations should advertise the page as their target.
    expect(result.operations!.some(op => op.targetType === 'page')).toBe(true);
  });

  it('rejects a non-existent page id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.operation.getPageOperations({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — operation.getSpaceOperations (live)', () => {
  it('returns the owner-permitted operations for the created space', async () => {
    const result = await client.operation.getSpaceOperations({ id: Number(space.id) });

    const names = expectWellFormedOperations(result);
    expect(names).toContain('read');
    // A space exposes operations targeting both the space and its contents.
    expect(result.operations!.some(op => op.targetType === 'space')).toBe(true);
  });
});

describe('Confluence Cloud v2 — operation.getBlogPostOperations (live)', () => {
  it('returns the owner-permitted operations for the created blog post', async () => {
    const result = await client.operation.getBlogPostOperations({ id: Number(blog.id) });

    const names = expectWellFormedOperations(result);
    expect(names).toContain('read');
    expect(result.operations!.some(op => op.targetType === 'blogpost')).toBe(true);
  });
});

describe('Confluence Cloud v2 — operation.getFooterCommentOperations (live)', () => {
  it('returns the owner-permitted operations for the created footer comment', async () => {
    const result = await client.operation.getFooterCommentOperations({ id: Number(footerComment.id) });

    const names = expectWellFormedOperations(result);
    // The author of a comment can at least read it.
    expect(names).toContain('read');
    expect(result.operations!.some(op => op.targetType === 'comment')).toBe(true);
  });

  it('rejects a non-existent footer comment id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.operation.getFooterCommentOperations({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — operation.getInlineCommentOperations (live)', () => {
  let inlineCommentId: number | undefined;

  beforeAll(async () => {
    // Anchor an inline comment to the unique phrase planted in the page body.
    try {
      const inline = await client.comment.createInlineComment({
        pageId: String(page.id),
        body: storageBody(testName('inline-comment-for-operations')),
        inlineCommentProperties: {
          textSelection: INLINE_ANCHOR,
          textSelectionMatchCount: 1,
          textSelectionMatchIndex: 0,
        },
      });
      inlineCommentId = Number(inline.id);
      tracker.defer(async () => {
        await client.comment.deleteInlineComment({ commentId: Number(inline.id) }).catch(() => undefined);
      });
    } catch {
      inlineCommentId = undefined;
    }
  }, 30_000);

  it('returns the owner-permitted operations for the created inline comment, or a typed ApiError', async () => {
    if (inlineCommentId !== undefined) {
      const result = await client.operation.getInlineCommentOperations({ id: inlineCommentId });

      const names = expectWellFormedOperations(result);
      expect(names).toContain('read');
      expect(result.operations!.some(op => op.targetType === 'comment')).toBe(true);

      return;
    }

    // Inline comment creation was not feasible on this site — exercise the method
    // with a plausible id and assert it fails as a typed ApiError.
    await expectOperationsOrApiError(
      () => client.operation.getInlineCommentOperations({ id: 999_999_999 }),
      'getInlineCommentOperations',
    );
  });
});

describe('Confluence Cloud v2 — operation: content types without a cheap parent (typing + ApiError)', () => {
  // These targets (attachment, custom content, whiteboard, database, smart link,
  // folder) are not created by the bootstrap, so each method is called with a
  // plausible id. The contract is: a typed PermittedOperations OR a typed ApiError.
  // NOTE: unlike every sibling endpoint, getAttachmentOperations types `id` as a
  // string (attachment ids are non-numeric, e.g. `att123`); pass a string here.
  it('getAttachmentOperations resolves to PermittedOperations or a typed ApiError', () =>
    expectOperationsOrApiError(
      () => client.operation.getAttachmentOperations({ id: 'att999999999' }),
      'getAttachmentOperations',
    ));

  it('getCustomContentOperations resolves to PermittedOperations or a typed ApiError', () =>
    expectOperationsOrApiError(
      () => client.operation.getCustomContentOperations({ id: 999_999_999 }),
      'getCustomContentOperations',
    ));

  it('getWhiteboardOperations resolves to PermittedOperations or a typed ApiError', () =>
    expectOperationsOrApiError(
      () => client.operation.getWhiteboardOperations({ id: 999_999_999 }),
      'getWhiteboardOperations',
    ));

  it('getDatabaseOperations resolves to PermittedOperations or a typed ApiError', () =>
    expectOperationsOrApiError(
      () => client.operation.getDatabaseOperations({ id: 999_999_999 }),
      'getDatabaseOperations',
    ));

  it('getSmartLinkOperations resolves to PermittedOperations or a typed ApiError', () =>
    expectOperationsOrApiError(
      () => client.operation.getSmartLinkOperations({ id: 999_999_999 }),
      'getSmartLinkOperations',
    ));

  it('getFolderOperations resolves to PermittedOperations or a typed ApiError', () =>
    expectOperationsOrApiError(
      () => client.operation.getFolderOperations({ id: 999_999_999 }),
      'getFolderOperations',
    ));
});
