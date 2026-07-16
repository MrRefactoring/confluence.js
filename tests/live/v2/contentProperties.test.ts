import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost } from '../setup/fixtures';
import { waitFor } from '../helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `contentProperties` API.
 *
 * `contentProperties` is the same property-CRUD surface repeated across nine
 * content types (page, blogpost, attachment, customContent, whiteboard,
 * database, smartLink, folder, comment): `get<Type>ContentProperties` (list),
 * `create<Type>Property`, `get<Type>ContentPropertiesById`,
 * `update<Type>PropertyById`, `delete<Type>PropertyById`.
 *
 * Per the suite coverage convention, ONE representative family is verified
 * deeply and a sibling is exercised lightly:
 *   - PAGE family — full lifecycle (create → list → get-by-id → update → delete
 *     → 404), asserting the `ContentProperty` contract: `id`/`key` are strings,
 *     `value` round-trips an arbitrary JSON object verbatim, `version.number`
 *     starts at 1 and increments on update.
 *   - BLOGPOST family — create + read (list & by-id) + update + delete, proving
 *     the structurally-identical sibling methods serialize and route correctly.
 *
 * The remaining seven families (attachment, customContent, whiteboard, database,
 * smartLink, folder, comment) have no cheaply-bootstrappable parent here, so
 * their list endpoint is invoked against a non-existent parent id purely to
 * exercise param serialization + response typing: each must either return a
 * well-typed empty page or surface a typed `ApiError` (404/400). Their
 * create/get-by-id/update/delete methods are validated by the compiler only.
 *
 * Shared infrastructure: `getV2Client()` (singleton v2 client),
 * `ResourceTracker` (LIFO retried teardown), `createTestSpace/Page/BlogPost`
 * fixtures (self-cleaning), `waitFor` (eventually-consistent reads).
 */

const PROP_KEY = 'cfjs.test';
/** Arbitrary JSON the API must store and return verbatim (`value` is free-form). */
const PROP_VALUE = { any: 'json', n: 1, nested: { ok: true }, list: [1, 2, 3] };

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();

let pageId: number;
let blogId: number;

/** Structural contract of a single `ContentProperty` returned by the API. */
function expectWellFormedProperty(
  property: { id?: string; key?: string; value?: unknown; version?: { number?: number } | null },
  expectedKey: string,
) {
  expect(typeof property.id).toBe('string');
  expect(property.id).toBeTruthy();
  // a numeric-string id — must survive `Number()` for the by-id/delete params.
  expect(Number.isNaN(Number(property.id))).toBe(false);
  expect(property.key).toBe(expectedKey);
  // `version` is `VersionSchema.nullish()`; a fresh property carries a real version.
  expect(property.version).toBeTruthy();
  expect(typeof property.version?.number).toBe('number');
}

beforeAll(async () => {
  client = getV2Client();

  const space = await createTestSpace(tracker);
  const page = await createTestPage(tracker, space.id);
  const blog = await createTestBlogPost(tracker, space.id);

  pageId = Number(page.id);
  blogId = Number(blog.id);
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — contentProperties page family (live, full lifecycle)', () => {
  let propertyId: number;

  it('createPageProperty returns a typed ContentProperty echoing key and arbitrary JSON value', async () => {
    const created = await client.contentProperties.createPageProperty({
      pageId,
      key: PROP_KEY,
      value: PROP_VALUE,
    });

    // ensure teardown even if a later step throws before the explicit delete.
    propertyId = Number(created.id);
    tracker.defer(async () => {
      await client.contentProperties
        .deletePagePropertyById({ pageId, propertyId })
        .catch(() => undefined);
    });

    expectWellFormedProperty(created, PROP_KEY);
    // free-form JSON must come back byte-for-byte equal.
    expect(created.value).toEqual(PROP_VALUE);
    // first version of a freshly created property is 1.
    expect(created.version?.number).toBe(1);
  });

  it('getPageContentProperties lists the new property (typed page) and `key` filters to it', async () => {
    // listing is eventually consistent — poll until the new property appears.
    const listed = await waitFor(
      () => client.contentProperties.getPageContentProperties({ pageId }),
      page => (page.results ?? []).some(p => Number(p.id) === propertyId),
    );

    expect(Array.isArray(listed.results)).toBe(true);
    expect(listed._links).toBeDefined();
    const mine = listed.results!.find(p => Number(p.id) === propertyId)!;
    expectWellFormedProperty(mine, PROP_KEY);
    expect(mine.value).toEqual(PROP_VALUE);

    // server-side `key` filter returns only the matching property.
    const filtered = await client.contentProperties.getPageContentProperties({ pageId, key: PROP_KEY });
    expect(filtered.results!.length).toBeGreaterThan(0);
    expect(filtered.results!.every(p => p.key === PROP_KEY)).toBe(true);
    expect(filtered.results!.some(p => Number(p.id) === propertyId)).toBe(true);
  });

  it('getPageContentPropertiesById returns the same canonical entity as the listing', async () => {
    const fetched = await client.contentProperties.getPageContentPropertiesById({ pageId, propertyId });

    expect(Number(fetched.id)).toBe(propertyId);
    expect(fetched.key).toBe(PROP_KEY);
    expect(fetched.value).toEqual(PROP_VALUE);
    expect(fetched.version?.number).toBe(1);
  });

  it('updatePagePropertyById bumps the version and replaces the value', async () => {
    const current = await client.contentProperties.getPageContentPropertiesById({ pageId, propertyId });
    const nextVersion = (current.version?.number ?? 0) + 1;
    const newValue = { any: 'json', n: 2, updated: true };

    const updated = await client.contentProperties.updatePagePropertyById({
      pageId,
      propertyId,
      key: PROP_KEY,
      value: newValue,
      version: { number: nextVersion },
    });

    expect(Number(updated.id)).toBe(propertyId);
    expect(updated.key).toBe(PROP_KEY);
    expect(updated.value).toEqual(newValue);
    expect(updated.value).not.toEqual(PROP_VALUE);
    expect(updated.version?.number).toBe(nextVersion);

    // the change is observable on a fresh read.
    const reread = await client.contentProperties.getPageContentPropertiesById({ pageId, propertyId });
    expect(reread.value).toEqual(newValue);
    expect(reread.version?.number).toBe(nextVersion);
  });

  it('deletePagePropertyById removes the property; a subsequent read is a 404 ApiError', async () => {
    await expect(client.contentProperties.deletePagePropertyById({ pageId, propertyId })).resolves.toBeUndefined();

    let caught: unknown;
    try {
      await client.contentProperties.getPageContentPropertiesById({ pageId, propertyId });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — contentProperties blogpost family (live, light CRUD)', () => {
  const key = 'cfjs.blog';
  let propertyId: number;

  it('createBlogpostProperty + getBlogpostContentPropertiesById round-trip a property', async () => {
    const created = await client.contentProperties.createBlogpostProperty({
      blogpostId: blogId,
      key,
      value: { from: 'blogpost' },
    });

    propertyId = Number(created.id);
    tracker.defer(async () => {
      await client.contentProperties
        .deleteBlogpostPropertyById({ blogpostId: blogId, propertyId })
        .catch(() => undefined);
    });

    expectWellFormedProperty(created, key);
    expect(created.value).toEqual({ from: 'blogpost' });
    expect(created.version?.number).toBe(1);

    const fetched = await client.contentProperties.getBlogpostContentPropertiesById({ blogpostId: blogId, propertyId });
    expect(Number(fetched.id)).toBe(propertyId);
    expect(fetched.key).toBe(key);
    expect(fetched.value).toEqual({ from: 'blogpost' });
  });

  it('getBlogpostContentProperties lists the property in a typed page', async () => {
    const listed = await waitFor(
      () => client.contentProperties.getBlogpostContentProperties({ blogpostId: blogId }),
      page => (page.results ?? []).some(p => Number(p.id) === propertyId),
    );

    expect(Array.isArray(listed.results)).toBe(true);
    expect(listed.results!.some(p => Number(p.id) === propertyId && p.key === key)).toBe(true);
  });

  it('updateBlogpostPropertyById bumps the version, then deleteBlogpostPropertyById removes it', async () => {
    const current = await client.contentProperties.getBlogpostContentPropertiesById({ blogpostId: blogId, propertyId });
    const nextVersion = (current.version?.number ?? 0) + 1;

    const updated = await client.contentProperties.updateBlogpostPropertyById({
      blogpostId: blogId,
      propertyId,
      key,
      value: { from: 'blogpost', v: 2 },
      version: { number: nextVersion },
    });
    expect(updated.value).toEqual({ from: 'blogpost', v: 2 });
    expect(updated.version?.number).toBe(nextVersion);

    await expect(
      client.contentProperties.deleteBlogpostPropertyById({ blogpostId: blogId, propertyId }),
    ).resolves.toBeUndefined();

    let caught: unknown;
    try {
      await client.contentProperties.getBlogpostContentPropertiesById({ blogpostId: blogId, propertyId });
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — contentProperties remaining-family listers (live, type-exercise)', () => {
  /**
   * Each remaining family lacks a cheaply-bootstrappable parent in this suite, so
   * we drive its list endpoint against a non-existent parent id. A correct
   * implementation either returns a typed empty page or throws a typed `ApiError`
   * (404 for a missing parent, occasionally 400 for an unparseable id). Either
   * outcome proves param serialization + response decoding line up.
   */
  const MISSING_NUMERIC = 999_999_999;
  const MISSING_ATTACHMENT = 'att999999999';

  async function expectEmptyPageOrApiError(call: () => Promise<{ results?: unknown[] }>) {
    let caught: unknown;
    let value: { results?: unknown[] } | undefined;
    try {
      value = await call();
    } catch (error) {
      caught = error;
    }

    if (caught !== undefined) {
      expect(caught).toBeInstanceOf(ApiError);
      expect([400, 404]).toContain((caught as ApiError).status);
    } else {
      expect(Array.isArray(value!.results)).toBe(true);
    }
  }

  it('getAttachmentContentProperties (string parent id)', async () => {
    await expectEmptyPageOrApiError(() =>
      client.contentProperties.getAttachmentContentProperties({ attachmentId: MISSING_ATTACHMENT }),
    );
  });

  it('getCustomContentContentProperties', async () => {
    await expectEmptyPageOrApiError(() =>
      client.contentProperties.getCustomContentContentProperties({ customContentId: MISSING_NUMERIC }),
    );
  });

  it('getWhiteboardContentProperties', async () => {
    await expectEmptyPageOrApiError(() =>
      client.contentProperties.getWhiteboardContentProperties({ id: MISSING_NUMERIC }),
    );
  });

  it('getDatabaseContentProperties', async () => {
    await expectEmptyPageOrApiError(() =>
      client.contentProperties.getDatabaseContentProperties({ id: MISSING_NUMERIC }),
    );
  });

  it('getSmartLinkContentProperties', async () => {
    await expectEmptyPageOrApiError(() =>
      client.contentProperties.getSmartLinkContentProperties({ id: MISSING_NUMERIC }),
    );
  });

  it('getFolderContentProperties', async () => {
    await expectEmptyPageOrApiError(() =>
      client.contentProperties.getFolderContentProperties({ id: MISSING_NUMERIC }),
    );
  });

  it('getCommentContentProperties', async () => {
    await expectEmptyPageOrApiError(() =>
      client.contentProperties.getCommentContentProperties({ commentId: MISSING_NUMERIC }),
    );
  });
});
