/**
 * Resource fixtures shared across the live cloud suite.
 *
 * Most v2 resources hang off a space (pages, blog posts, custom content,
 * properties, permissions) and many off a page (attachments, comments, labels,
 * versions, children). These helpers create the common parents in one call,
 * register their teardown on the suite's {@link ResourceTracker}, and return the
 * created entity so a suite can get to its actual subject in two or three lines.
 *
 * They deliberately use only the public v2 client (plus the v1 delete-space gap),
 * so a fixture that breaks is itself a signal worth surfacing.
 */
import { getLiveClient, v1Request } from './client';
import type { ResourceTracker } from './resources';
import { spaceKey, testName } from '../helpers/naming';

/** Confluence "storage" representation body for a page/blog post/comment. */
export function storageBody(html: string) {
  return { representation: 'storage' as const, value: html };
}

export interface TestSpace {
  id: string;
  key: string;
  name: string;
}

/**
 * Create an isolated space and register its deletion (via v1 REST — v2 has no
 * deleteSpace). `label` disambiguates the key/name when a suite needs several.
 */
export async function createTestSpace(tracker: ResourceTracker, label = 'space'): Promise<TestSpace> {
  const client = getLiveClient();
  const key = spaceKey(label);
  const space = await client.space.createSpace({ body: { key, name: testName(label) } });

  tracker.defer(async () => {
    await v1Request(`space/${key}`, { method: 'DELETE' }).catch(() => undefined);
  });

  return { id: String(space.id), key: space.key!, name: space.name! };
}

export interface CreateTestPageOptions {
  title?: string;
  /** Storage-format HTML; defaults to a small paragraph. */
  html?: string;
  parentId?: string;
  status?: 'current' | 'draft';
}

/** Create a page in `spaceId` and register its deletion. */
export async function createTestPage(tracker: ResourceTracker, spaceId: string, options: CreateTestPageOptions = {}) {
  const client = getLiveClient();
  const page = await client.page.createPage({
    body: {
      spaceId,
      status: options.status ?? 'current',
      title: options.title ?? testName('page'),
      ...(options.parentId ? { parentId: options.parentId } : {}),
      body: storageBody(options.html ?? '<p>cfjs live test page</p>'),
    },
  });

  tracker.defer(async () => {
    await client.page.deletePage({ id: Number(page.id) }).catch(() => undefined);
  });

  return page;
}

export interface CreateTestBlogPostOptions {
  title?: string;
  html?: string;
  status?: 'current' | 'draft';
}

/** Create a blog post in `spaceId` and register its deletion. */
export async function createTestBlogPost(
  tracker: ResourceTracker,
  spaceId: string,
  options: CreateTestBlogPostOptions = {},
) {
  const client = getLiveClient();
  const blogPost = await client.blogPost.createBlogPost({
    body: {
      spaceId,
      status: options.status ?? 'current',
      title: options.title ?? testName('blogpost'),
      body: storageBody(options.html ?? '<p>cfjs live test blog post</p>'),
    },
  });

  tracker.defer(async () => {
    await client.blogPost.deleteBlogPost({ id: Number(blogPost.id) }).catch(() => undefined);
  });

  return blogPost;
}
