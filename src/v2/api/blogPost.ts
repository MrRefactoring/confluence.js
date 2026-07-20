import { BlogPostsSchema, type BlogPosts } from '../models/blogPosts';
import { BlogPostSchema, type BlogPost } from '../models/blogPost';
import { LabelBlogPostsSchema, type LabelBlogPosts } from '../models/labelBlogPosts';
import { BlogPostsInSpaceSchema, type BlogPostsInSpace } from '../models/blogPostsInSpace';
import type { GetBlogPosts } from '../parameters/getBlogPosts';
import type { CreateBlogPost } from '../parameters/createBlogPost';
import type { GetBlogPostById } from '../parameters/getBlogPostById';
import type { UpdateBlogPost } from '../parameters/updateBlogPost';
import type { DeleteBlogPost } from '../parameters/deleteBlogPost';
import type { GetLabelBlogPosts } from '../parameters/getLabelBlogPosts';
import type { GetBlogPostsInSpace } from '../parameters/getBlogPostsInSpace';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns all blog posts. The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only blog posts that the user has permission to view will be returned.
 */
export async function getBlogPosts(client: Client, parameters?: GetBlogPosts): Promise<BlogPosts> {
  const config: SendRequestOptions<BlogPosts> = {
    url: '/wiki/api/v2/blogposts',
    method: 'GET',
    searchParams: {
      id: parameters?.id,
      'space-id': parameters?.spaceId,
      sort: parameters?.sort,
      status: parameters?.status,
      title: parameters?.title,
      'body-format': parameters?.bodyFormat,
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: BlogPostsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new blog post in the space specified by the spaceId.
 *
 * By default this will create the blog post as a non-draft, unless the status is specified as draft. If creating a
 * non-draft, the title must not be empty.
 *
 * Currently only supports the storage representation specified in the body.representation enums below
 */
export async function createBlogPost(client: Client, parameters: CreateBlogPost): Promise<BlogPost> {
  const config: SendRequestOptions<BlogPost> = {
    url: '/wiki/api/v2/blogposts',
    method: 'POST',
    searchParams: {
      private: parameters.private,
    },
    body: parameters.body,
    schema: BlogPostSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
 * corresponding space.
 */
export async function getBlogPostById(client: Client, parameters: GetBlogPostById): Promise<BlogPost> {
  const config: SendRequestOptions<BlogPost> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      'get-draft': parameters.getDraft,
      status: parameters.status,
      version: parameters.version,
      'include-labels': parameters.includeLabels,
      'include-properties': parameters.includeProperties,
      'include-operations': parameters.includeOperations,
      'include-likes': parameters.includeLikes,
      'include-versions': parameters.includeVersions,
      'include-version': parameters.includeVersion,
      'include-favorited-by-current-user-status': parameters.includeFavoritedByCurrentUserStatus,
      'include-webresources': parameters.includeWebresources,
      'include-collaborators': parameters.includeCollaborators,
    },
    schema: BlogPostSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a blog post by id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
 * corresponding space. Permission to update blog posts in the space.
 */
export async function updateBlogPost(client: Client, parameters: UpdateBlogPost): Promise<BlogPost> {
  const config: SendRequestOptions<BlogPost> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: BlogPostSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a blog post by id.
 *
 * By default this will delete blog posts that are non-drafts. To delete a blog post that is a draft, the endpoint must
 * be called on a draft with the following param `draft=true`. Discarded drafts are not sent to the trash and are
 * permanently deleted.
 *
 * Deleting a blog post that is not a draft moves the blog post to the trash, where it can be restored later. To
 * permanently delete a blog post (or "purge" it), the endpoint must be called on a **trashed** blog post with the
 * following param `purge=true`.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
 * corresponding space. Permission to delete blog posts in the space. Permission to administer the space (if attempting
 * to purge).
 */
export async function deleteBlogPost(client: Client, parameters: DeleteBlogPost): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      purge: parameters.purge,
      draft: parameters.draft,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the blogposts of specified label. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getLabelBlogPosts(client: Client, parameters: GetLabelBlogPosts): Promise<LabelBlogPosts> {
  const config: SendRequestOptions<LabelBlogPosts> = {
    url: `/wiki/api/v2/labels/${parameters.id}/blogposts`,
    method: 'GET',
    searchParams: {
      'space-id': parameters.spaceId,
      'body-format': parameters.bodyFormat,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: LabelBlogPostsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all blog posts in a space. The number of results is limited by the `limit` parameter and additional results
 * (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission) and view the space. Only blog posts that the user has permission to view will be returned.
 */
export async function getBlogPostsInSpace(client: Client, parameters: GetBlogPostsInSpace): Promise<BlogPostsInSpace> {
  const config: SendRequestOptions<BlogPostsInSpace> = {
    url: `/wiki/api/v2/spaces/${parameters.id}/blogposts`,
    method: 'GET',
    searchParams: {
      sort: parameters.sort,
      status: parameters.status,
      title: parameters.title,
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: BlogPostsInSpaceSchema,
  };

  return await client.sendRequest(config);
}
