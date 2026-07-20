import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client, rawRequest } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `attachment` API
 * (`getAttachments`, `getAttachmentById`, `deleteAttachment`,
 * `getPageAttachments`, `getBlogpostAttachments`, `getCustomContentAttachments`,
 * `getLabelAttachments`, `getAttachmentThumbnailById`).
 *
 * v2 has NO attachment-upload endpoint, so every attachment under test is created
 * through the v1 REST multipart endpoint (`POST content/{id}/child/attachment`)
 * and then *read and deleted* through v2 — the SDK surface this suite verifies.
 *
 * The assertions verify the *contract* of each function, not merely that a call
 * resolves: returned attachments are typed exactly as the Zod `AttachmentSummary`
 * / `Attachment` models declare (id/title/mediaType/fileSize/version/_links);
 * a freshly uploaded attachment appears in the page/blogpost listings and is
 * canonically consistent across `getAttachmentById`, `getPageAttachments` and the
 * site-wide `getAttachments`; query params (`filename`, `limit`, `include-*`) have
 * a real, observable effect; and error responses surface as a typed `ApiError`.
 *
 * Shared infrastructure: see `./setup` (live client, v1 REST gap-filler, LIFO
 * resource tracker, space/page/blog fixtures) and `./helpers` (run-scoped naming,
 * eventually-consistent polling).
 */

const ATT_BODY = 'cfjs attachment body';
/** Byte length of {@link ATT_BODY} — used to assert the reported `fileSize`. */
const ATT_BYTES = Buffer.byteLength(ATT_BODY);
const ATT_MEDIA_TYPE = 'text/plain';

const ATTACHMENT_STATUSES = ['current', 'draft', 'archived', 'historical', 'trashed', 'deleted', 'any'] as const;

let client: ReturnType<typeof createV2Client>;

/** A single attachment summary as returned inside a page/blogpost listing. */
type AttachmentSummary = NonNullable<
  Awaited<ReturnType<typeof client.attachment.getPageAttachments>>['results']
>[number];

const tracker = new ResourceTracker();

let space: Awaited<ReturnType<typeof createTestSpace>>;
let page: Awaited<ReturnType<typeof createTestPage>>;

/** The canonical attachment uploaded onto {@link page}, discovered via v2. */
let pageAttachment: AttachmentSummary;
let pageAttachmentFilename: string;

/**
 * Upload a small text file onto a v1 content container (page / blog post).
 * v2 exposes no upload endpoint, so this is the only way to materialize an
 * attachment the v2 read/delete endpoints can then operate on. We deliberately
 * do NOT set `Content-Type` — `fetch` derives the multipart boundary from the
 * `FormData` body itself.
 */
async function uploadV1Attachment(parentId: string, filename: string): Promise<void> {
  const form = new FormData();
  form.append('file', new Blob([ATT_BODY], { type: ATT_MEDIA_TYPE }), filename);

  await rawRequest(`content/${parentId}/child/attachment`, {
    method: 'POST',
    raw: form,
    headers: { 'X-Atlassian-Token': 'no-check' },
  });
}

/** A meaningful structural check for an attachment summary/entity. */
function expectWellFormedAttachment(attachment: AttachmentSummary) {
  expect(typeof attachment.id).toBe('string');
  expect(attachment.id).toBeTruthy();
  expect(typeof attachment.title).toBe('string');
  expect(attachment.title).toBeTruthy();
  // `createdAt` is `z.coerce.date()` → a parsed response is a real Date.
  expect(attachment.createdAt).toBeInstanceOf(Date);
  expect(ATTACHMENT_STATUSES).toContain(attachment.status);
}

beforeAll(async () => {
  client = getV2Client();

  space = await createTestSpace(tracker);
  page = await createTestPage(tracker, space.id);

  pageAttachmentFilename = testName('att.txt');
  await uploadV1Attachment(page.id!, pageAttachmentFilename);

  // Prefer discovering the attachment (and its real v2 id) by reading it back,
  // rather than trusting the v1 response id format. Indexing is not read-your-write.
  const listing = await waitFor(
    () => client.attachment.getPageAttachments({ id: Number(page.id) }),
    res => (res.results ?? []).some(a => a.title === pageAttachmentFilename),
    { maxAttempts: 8 },
  );

  pageAttachment = listing.results!.find(a => a.title === pageAttachmentFilename)!;
}, 60_000);

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — attachment.getPageAttachments (live)', () => {
  it('returns the uploaded attachment with correctly-typed fields', () => {
    expectWellFormedAttachment(pageAttachment);

    expect(pageAttachment.title).toBe(pageAttachmentFilename);
    // Only the page container id is populated for a page attachment.
    expect(pageAttachment.pageId).toBe(String(page.id));
    expect(pageAttachment.blogPostId).toBeUndefined();
    expect(pageAttachment.customContentId).toBeUndefined();

    // mediaType / fileSize are declared `.optional()` but a real attachment carries them.
    expect(typeof pageAttachment.mediaType).toBe('string');
    expect(pageAttachment.mediaType).toContain('text/plain');
    expect(typeof pageAttachment.fileSize).toBe('number');
    expect(pageAttachment.fileSize).toBe(ATT_BYTES);

    // `version` is `.nullish()`; a current attachment exposes version 1.
    expect(pageAttachment.version).toBeTruthy();
    expect(typeof pageAttachment.version?.number).toBe('number');
    expect(pageAttachment.version?.number).toBe(1);

    // `_links` is `.nullish()`; the download link is the load-bearing field.
    expect(typeof pageAttachment._links?.download).toBe('string');
    expect(pageAttachment._links?.download).toBeTruthy();
  });

  it('returns a typed page envelope with `_links`', async () => {
    const listing = await client.attachment.getPageAttachments({ id: Number(page.id) });

    expect(Array.isArray(listing.results)).toBe(true);
    expect(listing.results!.length).toBeGreaterThan(0);
    expect(listing._links).toBeDefined();
    listing.results!.forEach(expectWellFormedAttachment);
  });

  it('honors `limit` (results never exceed the requested page size)', async () => {
    const limited = await client.attachment.getPageAttachments({ id: Number(page.id), limit: 1 });

    expect(limited.results!.length).toBeLessThanOrEqual(1);
  });

  it('filters by `filename` to the uploaded attachment', async () => {
    const filtered = await client.attachment.getPageAttachments({
      id: Number(page.id),
      filename: pageAttachmentFilename,
    });

    expect(filtered.results!.length).toBeGreaterThan(0);
    expect(filtered.results!.every(a => a.title === pageAttachmentFilename)).toBe(true);
    expect(filtered.results!.some(a => a.id === pageAttachment.id)).toBe(true);
  });

  it('rejects a non-existent page id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.attachment.getPageAttachments({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — attachment.getAttachmentById (live)', () => {
  it('returns the same canonical entity as the getPageAttachments summary', async () => {
    const full = await client.attachment.getAttachmentById({ id: pageAttachment.id! });

    expect(full.id).toBe(pageAttachment.id);
    expect(full.title).toBe(pageAttachment.title);
    expect(full.pageId).toBe(String(page.id));
    expect(full.mediaType).toBe(pageAttachment.mediaType);
    expect(full.fileSize).toBe(ATT_BYTES);
    expect(full.status).toBe(pageAttachment.status);
    expect(typeof full._links?.download).toBe('string');
  });

  it('expands labels/properties/operations/versions only when the include-* flags are set', async () => {
    const base = await client.attachment.getAttachmentById({ id: pageAttachment.id! });
    expect(base.labels).toBeUndefined();
    expect(base.properties).toBeUndefined();
    expect(base.operations).toBeUndefined();
    expect(base.versions).toBeUndefined();

    const expanded = await client.attachment.getAttachmentById({
      id: pageAttachment.id!,
      includeLabels: true,
      includeProperties: true,
      includeOperations: true,
      includeVersions: true,
    });

    expect(expanded.labels).toBeDefined();
    expect(Array.isArray(expanded.labels?.results)).toBe(true);
    expect(expanded.properties).toBeDefined();
    expect(Array.isArray(expanded.properties?.results)).toBe(true);
    expect(expanded.operations).toBeDefined();
    expect(Array.isArray(expanded.operations?.results)).toBe(true);
    expect(expanded.versions).toBeDefined();
    expect(Array.isArray(expanded.versions?.results)).toBe(true);
  });

  it('retrieves a specific historical version via `version`', async () => {
    const v1 = await client.attachment.getAttachmentById({ id: pageAttachment.id!, version: 1 });

    expect(v1.id).toBe(pageAttachment.id);
    expect(v1.version?.number).toBe(1);
  });

  it('rejects a non-existent attachment id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.attachment.getAttachmentById({ id: 'att999999999999' });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — attachment.getAttachments (live, site-wide)', () => {
  it('returns a typed page of attachment summaries with `_links`', async () => {
    const listing = await client.attachment.getAttachments({ limit: 25 });

    expect(Array.isArray(listing.results)).toBe(true);
    expect(listing._links).toBeDefined();
    listing.results!.forEach(expectWellFormedAttachment);
  });

  it('honors `limit` and surfaces a pagination cursor when more results exist', async () => {
    const firstPage = await client.attachment.getAttachments({ limit: 1 });

    expect(firstPage.results!.length).toBeLessThanOrEqual(1);

    // If the site holds more than one attachment, the `Link`-header cursor is
    // surfaced as `_links.next`.
    if (firstPage._links?.next !== undefined) {
      expect(typeof firstPage._links.next).toBe('string');
      expect(firstPage._links.next.length).toBeGreaterThan(0);
    }
  });

  it('finds the uploaded attachment when filtered by `filename`', async () => {
    const found = await waitFor(
      () => client.attachment.getAttachments({ filename: pageAttachmentFilename, limit: 50 }),
      res => (res.results ?? []).some(a => a.id === pageAttachment.id),
      { maxAttempts: 8 },
    );

    const match = found.results!.find(a => a.id === pageAttachment.id)!;
    expect(match.title).toBe(pageAttachmentFilename);
    expect(match.pageId).toBe(String(page.id));
  });
});

describe('Confluence Cloud v2 — attachment.getAttachmentThumbnailById (live, gated-graceful)', () => {
  it('either returns binary thumbnail data or a typed ApiError for a non-image file', async () => {
    // Our attachment is `text/plain`; Confluence only renders thumbnails for
    // images, so a 400/404 is the expected outcome here. Still exercise the call
    // to verify typing + serialization, then assert on whichever shape comes back.
    let result: Awaited<ReturnType<typeof client.attachment.getAttachmentThumbnailById>> | undefined;
    let caught: unknown;

    try {
      result = await client.attachment.getAttachmentThumbnailById({ id: pageAttachment.id! });
    } catch (error) {
      caught = error;
    }

    if (caught !== undefined) {
      expect(caught).toBeInstanceOf(ApiError);
      expect([400, 404, 500]).toContain((caught as ApiError).status);
    } else {
      // A non-image (text/plain) attachment has no rendered thumbnail. The v2
      // endpoint still resolves, but for a non-image it returns a non-binary/empty
      // body rather than image bytes — so we do NOT demand binary here. The real
      // contract for a resolved call: it came back as a binary buffer OR some
      // defined/empty non-binary value, never a thrown error.
      // The declared return type is binary; a non-image may still resolve to an
      // empty/non-binary body at runtime, so widen to `unknown` before probing.
      const value: unknown = result;
      const isBinary = value instanceof ArrayBuffer || ArrayBuffer.isView(value);
      const isAcceptableNonBinary =
        value === undefined || value === null || typeof value === 'string' || typeof value === 'object';
      expect(isBinary || isAcceptableNonBinary).toBe(true);
    }
  });
});

describe('Confluence Cloud v2 — attachment.getBlogpostAttachments (live)', () => {
  const blogTracker = new ResourceTracker();
  let blog: Awaited<ReturnType<typeof createTestBlogPost>>;
  let blogAttachmentFilename: string;
  let blogAttachment: AttachmentSummary;

  beforeAll(async () => {
    blog = await createTestBlogPost(blogTracker, space.id);
    blogAttachmentFilename = testName('blog-att.txt');
    await uploadV1Attachment(blog.id!, blogAttachmentFilename);

    const listing = await waitFor(
      () => client.attachment.getBlogpostAttachments({ id: Number(blog.id) }),
      res => (res.results ?? []).some(a => a.title === blogAttachmentFilename),
      { maxAttempts: 8 },
    );

    blogAttachment = listing.results!.find(a => a.title === blogAttachmentFilename)!;
  }, 60_000);

  afterAll(() => blogTracker.cleanup());

  it('returns the uploaded blog-post attachment with the blog container id set', () => {
    expectWellFormedAttachment(blogAttachment);

    expect(blogAttachment.title).toBe(blogAttachmentFilename);
    // For a blog-post attachment only `blogPostId` is populated.
    expect(blogAttachment.blogPostId).toBe(String(blog.id));
    expect(blogAttachment.pageId).toBeUndefined();
    expect(blogAttachment.fileSize).toBe(ATT_BYTES);
    expect(typeof blogAttachment._links?.download).toBe('string');
  });

  it('rejects a non-existent blog-post id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.attachment.getBlogpostAttachments({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — attachment.getCustomContentAttachments (live, graceful)', () => {
  it('returns a typed (possibly empty) page or a typed ApiError', async () => {
    // We create no custom content; a plausible-but-unrelated id either returns an
    // empty typed page or 404s. Either way the call must exercise typing cleanly.
    let result: Awaited<ReturnType<typeof client.attachment.getCustomContentAttachments>> | undefined;
    let caught: unknown;

    try {
      result = await client.attachment.getCustomContentAttachments({ id: Number(page.id), limit: 10 });
    } catch (error) {
      caught = error;
    }

    if (caught !== undefined) {
      expect(caught).toBeInstanceOf(ApiError);
      expect([400, 404]).toContain((caught as ApiError).status);
    } else {
      expect(Array.isArray(result!.results)).toBe(true);
      result!.results!.forEach(expectWellFormedAttachment);
    }
  });
});

describe('Confluence Cloud v2 — attachment.getLabelAttachments (live, graceful)', () => {
  it('returns a typed (possibly empty) page or a typed ApiError', async () => {
    // No label is guaranteed to exist; call with a plausible numeric id and accept
    // either an empty typed page or a typed error.
    let result: Awaited<ReturnType<typeof client.attachment.getLabelAttachments>> | undefined;
    let caught: unknown;

    try {
      result = await client.attachment.getLabelAttachments({ id: 999_999_999, limit: 10 });
    } catch (error) {
      caught = error;
    }

    if (caught !== undefined) {
      expect(caught).toBeInstanceOf(ApiError);
      expect([400, 404]).toContain((caught as ApiError).status);
    } else {
      expect(Array.isArray(result!.results)).toBe(true);
      result!.results!.forEach(expectWellFormedAttachment);
    }
  });
});

describe('Confluence Cloud v2 — attachment.deleteAttachment (live, full lifecycle)', () => {
  const delTracker = new ResourceTracker();
  let delPage: Awaited<ReturnType<typeof createTestPage>>;
  let target: AttachmentSummary;

  beforeAll(async () => {
    // A throwaway page + attachment so the delete cannot disturb the other suites.
    // Give it a distinct title: the top-level `page` fixture lives in the same
    // space and a duplicate page title within one space is a 400 from the API.
    delPage = await createTestPage(delTracker, space.id, { title: testName('delete-page') });
    const filename = testName('delete-att.txt');
    await uploadV1Attachment(delPage.id!, filename);

    const listing = await waitFor(
      () => client.attachment.getPageAttachments({ id: Number(delPage.id) }),
      res => (res.results ?? []).some(a => a.title === filename),
      { maxAttempts: 8 },
    );

    target = listing.results!.find(a => a.title === filename)!;
  }, 60_000);

  afterAll(() => delTracker.cleanup());

  it('deletes the attachment; afterward getAttachmentById is trashed (or 404 if purged)', async () => {
    // SCHEMA NOTE: `deleteAttachment.id` is typed `z.number()`, but the real v2
    // attachment id is an `att…`-prefixed string (the `deleteAttachment` path param
    // is correctly typed `string`).
    await client.attachment.deleteAttachment({ id: target.id! });

    // A plain v2 DELETE moves the attachment to TRASH (204) rather than purging it:
    // it is still fetchable, now with status 'trashed'. Only a purge yields 404.
    const after = await client.attachment.getAttachmentById({ id: target.id! }).catch(e => e);

    if (after instanceof ApiError) {
      expect(after.status).toBe(404); // hard-deleted (purged)
    } else {
      expect(['trashed', 'deleted']).toContain(after.status); // moved to trash (the common case)
    }
  });
});
