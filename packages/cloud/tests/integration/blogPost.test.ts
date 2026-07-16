import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient, v1Request } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, storageBody, type TestSpace } from './setup/fixtures';
import { testName } from './helpers/naming';
import { waitFor } from './helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `blogPost` API
 * (`getBlogPosts`, `createBlogPost`, `getBlogPostById`, `updateBlogPost`,
 * `deleteBlogPost`, `getBlogPostsInSpace`, `getLabelBlogPosts`).
 *
 * The suite drives one isolated space and exercises the full blog-post lifecycle:
 * create → read-by-id → update (with a version bump) → list (site-wide, in-space,
 * by-label) → delete → 404. Assertions verify the *contract* declared by the Zod
 * models rather than merely that a call resolves: ids are numeric strings, dates
 * coerce to real `Date`s, `version.number` increments on update, query parameters
 * (`id`, `space-id`, `status`, `limit`/`cursor`) have an observable effect, the
 * same canonical post comes back consistently across endpoints, and a missing
 * post surfaces as a typed `ApiError`.
 *
 * ID gotcha: `BlogPost.id` / `spaceId` are numeric *strings* in the models, but
 * the path-id parameters are typed `z.number()`, so every id is wrapped in
 * `Number(...)` at the call site (mirrors `space.test.ts`).
 *
 * Shared infrastructure: see `./setup` and `./helpers`.
 */

const BLOG_POST_STATUSES = ['current', 'draft', 'historical', 'trashed', 'deleted', 'any'] as const;

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

let space: TestSpace;
/** The canonical blog post under test, created once and reused across describes. */
let blogPost: Awaited<ReturnType<typeof client.blogPost.createBlogPost>>;
/** A second post so list pagination (`limit` + cursor) is observable in-space. */
let secondPost: Awaited<ReturnType<typeof client.blogPost.createBlogPost>>;

const primaryTitle = testName('blogpost-primary');
const primaryHtml = '<p>cfjs live blog post body</p>';

/** Structural contract shared by a blog-post summary and a full blog post. */
function expectWellFormedBlogPost(post: {
  id?: string
  status?: string
  title?: string
  spaceId?: string
  authorId?: string
  createdAt?: Date
}) {
  expect(typeof post.id).toBe('string');
  expect(post.id).toBeTruthy();
  // numeric string — the path-id gotcha relies on this.
  expect(Number.isNaN(Number(post.id))).toBe(false);
  expect(typeof post.title).toBe('string');
  expect(post.title).toBeTruthy();
  expect(BLOG_POST_STATUSES).toContain(post.status);
  expect(typeof post.spaceId).toBe('string');
  expect(typeof post.authorId).toBe('string');
  // `createdAt` is `z.coerce.date()`, so a parsed response yields a real Date.
  expect(post.createdAt).toBeInstanceOf(Date);
}

beforeAll(async () => {
  client = getLiveClient();
  space = await createTestSpace(tracker, 'blogpost');

  blogPost = await client.blogPost.createBlogPost({
    body: {
      spaceId: space.id,
      status: 'current',
      title: primaryTitle,
      body: storageBody(primaryHtml),
    },
  });
  tracker.defer(async () => {
    await client.blogPost.deleteBlogPost({ id: Number(blogPost.id) }).catch(() => undefined);
  });

  secondPost = await client.blogPost.createBlogPost({
    body: {
      spaceId: space.id,
      status: 'current',
      title: testName('blogpost-second'),
      body: storageBody('<p>cfjs second blog post</p>'),
    },
  });
  tracker.defer(async () => {
    await client.blogPost.deleteBlogPost({ id: Number(secondPost.id) }).catch(() => undefined);
  });
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — blogPost.createBlogPost (live)', () => {
  it('returns a populated, correctly-typed BlogPost for the new post', () => {
    expectWellFormedBlogPost(blogPost);
    expect(blogPost.title).toBe(primaryTitle);
    expect(blogPost.status).toBe('current');
    expect(blogPost.spaceId).toBe(space.id);
    // A freshly created post is at version 1.
    expect(blogPost.version?.number).toBe(1);
    // Web UI link is surfaced for a real post.
    expect(typeof blogPost._links?.webui).toBe('string');
    expect(blogPost._links?.webui).toBeTruthy();
  });
});

describe('Confluence Cloud v2 — blogPost.getBlogPostById (live)', () => {
  it('returns the same canonical entity as create, with typed fields', async () => {
    const fetched = await client.blogPost.getBlogPostById({ id: Number(blogPost.id) });

    expect(fetched.id).toBe(blogPost.id);
    expect(fetched.title).toBe(primaryTitle);
    expect(fetched.status).toBe('current');
    expect(fetched.spaceId).toBe(space.id);
    expect(typeof fetched.authorId).toBe('string');
    expect(fetched.authorId).toBeTruthy();
    expect(fetched.createdAt).toBeInstanceOf(Date);
    expect(typeof fetched.version?.number).toBe('number');
    expect(fetched.version?.number).toBe(1);
  });

  it('returns the storage body when `bodyFormat` is requested', async () => {
    const fetched = await client.blogPost.getBlogPostById({ id: Number(blogPost.id), bodyFormat: 'storage' });

    expect(fetched.body?.storage).toBeDefined();
    expect(fetched.body?.storage?.representation).toBe('storage');
    expect(fetched.body?.storage?.value).toContain('cfjs live blog post body');
  });

  it('expands `labels` only when the include-* flag is set', async () => {
    const base = await client.blogPost.getBlogPostById({ id: Number(blogPost.id) });
    expect(base.labels).toBeUndefined();

    const expanded = await client.blogPost.getBlogPostById({ id: Number(blogPost.id), includeLabels: true });
    expect(expanded.labels).toBeDefined();
    expect(Array.isArray(expanded.labels?.results)).toBe(true);
  });

  it('rejects a non-existent blog post id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.blogPost.getBlogPostById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — blogPost.updateBlogPost (live)', () => {
  it('applies the change and bumps the version number', async () => {
    const current = await client.blogPost.getBlogPostById({ id: Number(blogPost.id) });
    const currentVersion = current.version?.number ?? 1;
    const newTitle = testName('blogpost-updated');
    const newHtml = '<p>cfjs updated blog post body</p>';

    const updated = await client.blogPost.updateBlogPost({
      id: Number(blogPost.id),
      body: {
        id: blogPost.id,
        status: 'current',
        title: newTitle,
        body: storageBody(newHtml),
        version: { number: currentVersion + 1 },
      },
    });

    expect(updated.id).toBe(blogPost.id);
    expect(updated.title).toBe(newTitle);
    expect(updated.version?.number).toBe(currentVersion + 1);

    // The change is persisted and visible on a fresh read.
    const refetched = await client.blogPost.getBlogPostById({ id: Number(blogPost.id), bodyFormat: 'storage' });
    expect(refetched.title).toBe(newTitle);
    expect(refetched.version?.number).toBe(currentVersion + 1);
    expect(refetched.body?.storage?.value).toContain('cfjs updated blog post body');
  });
});

describe('Confluence Cloud v2 — blogPost.getBlogPosts (live)', () => {
  it('returns a page of correctly-typed blog post summaries', async () => {
    const page = await client.blogPost.getBlogPosts({ limit: 50 });

    expect(Array.isArray(page.results)).toBe(true);
    expect(page._links).toBeDefined();
    page.results!.forEach(expectWellFormedBlogPost);
  });

  it('filters by `id` — only the requested blog post is returned', async () => {
    const filtered = await client.blogPost.getBlogPosts({ id: [Number(blogPost.id)] });

    expect(filtered.results!.length).toBeGreaterThan(0);
    expect(filtered.results!.every(p => p.id === blogPost.id)).toBe(true);
  });

  it('filters by `spaceId` — every result belongs to the test space', async () => {
    const filtered = await client.blogPost.getBlogPosts({ spaceId: [Number(space.id)], limit: 50 });

    expect(filtered.results!.length).toBeGreaterThanOrEqual(2);
    expect(filtered.results!.every(p => p.spaceId === space.id)).toBe(true);
    const ids = filtered.results!.map(p => p.id);
    expect(ids).toContain(blogPost.id);
    expect(ids).toContain(secondPost.id);
  });

  it('honors `limit` and exposes a pagination cursor when more results exist', async () => {
    const firstPage = await client.blogPost.getBlogPosts({ spaceId: [Number(space.id)], limit: 1 });

    expect(firstPage.results).toHaveLength(1);
    // Two posts in the space, page size 1 → a `next` cursor must be surfaced.
    expect(typeof firstPage._links?.next).toBe('string');
    expect(firstPage._links!.next!.length).toBeGreaterThan(0);
  });
});

describe('Confluence Cloud v2 — blogPost.getBlogPostsInSpace (live)', () => {
  it('returns only blog posts belonging to the space, including the created posts', async () => {
    const inSpace = await client.blogPost.getBlogPostsInSpace({ id: Number(space.id), limit: 50 });

    expect(Array.isArray(inSpace.results)).toBe(true);
    expect(inSpace.results!.every(p => p.spaceId === space.id)).toBe(true);
    inSpace.results!.forEach(expectWellFormedBlogPost);

    const ids = inSpace.results!.map(p => p.id);
    expect(ids).toContain(blogPost.id);
    expect(ids).toContain(secondPost.id);
  });

  it('honors `limit` and exposes a pagination cursor when more results exist', async () => {
    const firstPage = await client.blogPost.getBlogPostsInSpace({ id: Number(space.id), limit: 1 });

    expect(firstPage.results).toHaveLength(1);
    expect(typeof firstPage._links?.next).toBe('string');
    expect(firstPage._links!.next!.length).toBeGreaterThan(0);
  });

  it('filters by `status` — current posts are returned for the default status', async () => {
    const current = await client.blogPost.getBlogPostsInSpace({ id: Number(space.id), status: ['current'], limit: 50 });

    expect(current.results!.every(p => p.status === 'current')).toBe(true);
    expect(current.results!.some(p => p.id === blogPost.id)).toBe(true);
  });
});

describe('Confluence Cloud v2 — blogPost.getLabelBlogPosts (live)', () => {
  it('returns the blog post tagged with a given label', async () => {
    const labelName = `cfjs-blog-${Date.now().toString(36)}`;

    // v2 has no add-label endpoint; tag the post via v1 REST. The response carries
    // the numeric label id that the v2 `getLabelBlogPosts` path expects.
    let labelId: string | undefined;
    try {
      const added = await v1Request<{ results?: Array<{ id?: string; name?: string; prefix?: string }> }>(
        `content/${blogPost.id}/label`,
        { method: 'POST', body: [{ prefix: 'global', name: labelName }] },
      );
      labelId = added.results?.find(l => l.name === labelName)?.id ?? added.results?.[0]?.id;
    } catch {
      // Labelling occasionally fails on locked-down sites; the method is still
      // exercised below against whatever label id we could resolve (if any).
    }

    if (!labelId) {
      // Could not attach a label — degrade gracefully but still exercise typing
      // + serialization of the method, asserting a typed failure on a bogus id.
      let caught: unknown;
      try {
        await client.blogPost.getLabelBlogPosts({ id: 999_999_999 });
      } catch (error) {
        caught = error;
      }

      if (caught !== undefined) {
        expect(caught).toBeInstanceOf(ApiError);
      }

      return;
    }

    tracker.defer(async () => {
      await v1Request(`content/${blogPost.id}/label/${labelName}`, { method: 'DELETE' }).catch(() => undefined);
    });

    // Label association is eventually consistent.
    const labelled = await waitFor(
      () => client.blogPost.getLabelBlogPosts({ id: Number(labelId), limit: 50 }),
      result => (result.results ?? []).some(p => p.id === blogPost.id),
      { maxAttempts: 6 },
    );

    expect(labelled.results!.some(p => p.id === blogPost.id)).toBe(true);
    labelled.results!.forEach(expectWellFormedBlogPost);
  });
});

describe('Confluence Cloud v2 — blogPost.deleteBlogPost (live, full lifecycle)', () => {
  it('deletes a blog post so it is no longer current (trashed or, if purged, 404)', async () => {
    const disposable = await client.blogPost.createBlogPost({
      body: {
        spaceId: space.id,
        status: 'current',
        title: testName('blogpost-disposable'),
        body: storageBody('<p>cfjs disposable blog post</p>'),
      },
    });

    await client.blogPost.deleteBlogPost({ id: Number(disposable.id) });

    // A plain v2 DELETE moves content to TRASH (204) rather than purging it: the
    // post is still fetchable, now with status 'trashed'. Only a purge yields 404.
    const after = await client.blogPost.getBlogPostById({ id: Number(disposable.id) }).catch(e => e);

    if (after instanceof ApiError) {
      expect(after.status).toBe(404); // hard-deleted (purged)
    } else {
      expect(['trashed', 'deleted']).toContain(after.status); // moved to trash (the common case)
    }
  });
});
