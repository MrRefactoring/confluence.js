import { BlogPostLikeCountSchema, type BlogPostLikeCount } from '../models/blogPostLikeCount';
import { BlogPostLikeUsersSchema, type BlogPostLikeUsers } from '../models/blogPostLikeUsers';
import { PageLikeCountSchema, type PageLikeCount } from '../models/pageLikeCount';
import { PageLikeUsersSchema, type PageLikeUsers } from '../models/pageLikeUsers';
import { FooterLikeCountSchema, type FooterLikeCount } from '../models/footerLikeCount';
import { FooterLikeUsersSchema, type FooterLikeUsers } from '../models/footerLikeUsers';
import { InlineLikeCountSchema, type InlineLikeCount } from '../models/inlineLikeCount';
import { InlineLikeUsersSchema, type InlineLikeUsers } from '../models/inlineLikeUsers';
import type { GetBlogPostLikeCount } from '../parameters/getBlogPostLikeCount';
import type { GetBlogPostLikeUsers } from '../parameters/getBlogPostLikeUsers';
import type { GetPageLikeCount } from '../parameters/getPageLikeCount';
import type { GetPageLikeUsers } from '../parameters/getPageLikeUsers';
import type { GetFooterLikeCount } from '../parameters/getFooterLikeCount';
import type { GetFooterLikeUsers } from '../parameters/getFooterLikeUsers';
import type { GetInlineLikeCount } from '../parameters/getInlineLikeCount';
import type { GetInlineLikeUsers } from '../parameters/getInlineLikeUsers';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the count of likes of specific blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
 * post and its corresponding space.
 */
export async function getBlogPostLikeCount(
  client: Client,
  parameters: GetBlogPostLikeCount,
  options?: RequestOptions,
): Promise<BlogPostLikeCount> {
  const config: SendRequestOptions<BlogPostLikeCount> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/likes/count`,
    method: 'GET',
    schema: BlogPostLikeCountSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the account IDs of likes of specific blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
 * post and its corresponding space.
 */
export async function getBlogPostLikeUsers(
  client: Client,
  parameters: GetBlogPostLikeUsers,
  options?: RequestOptions,
): Promise<BlogPostLikeUsers> {
  const config: SendRequestOptions<BlogPostLikeUsers> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/likes/users`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: BlogPostLikeUsersSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the count of likes of specific page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getPageLikeCount(
  client: Client,
  parameters: GetPageLikeCount,
  options?: RequestOptions,
): Promise<PageLikeCount> {
  const config: SendRequestOptions<PageLikeCount> = {
    url: `/wiki/api/v2/pages/${parameters.id}/likes/count`,
    method: 'GET',
    schema: PageLikeCountSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the account IDs of likes of specific page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getPageLikeUsers(
  client: Client,
  parameters: GetPageLikeUsers,
  options?: RequestOptions,
): Promise<PageLikeUsers> {
  const config: SendRequestOptions<PageLikeUsers> = {
    url: `/wiki/api/v2/pages/${parameters.id}/likes/users`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: PageLikeUsersSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the count of likes of specific footer comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the
 * page/blogpost and its corresponding space.
 */
export async function getFooterLikeCount(
  client: Client,
  parameters: GetFooterLikeCount,
  options?: RequestOptions,
): Promise<FooterLikeCount> {
  const config: SendRequestOptions<FooterLikeCount> = {
    url: `/wiki/api/v2/footer-comments/${parameters.id}/likes/count`,
    method: 'GET',
    schema: FooterLikeCountSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the account IDs of likes of specific footer comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the
 * page/blogpost and its corresponding space.
 */
export async function getFooterLikeUsers(
  client: Client,
  parameters: GetFooterLikeUsers,
  options?: RequestOptions,
): Promise<FooterLikeUsers> {
  const config: SendRequestOptions<FooterLikeUsers> = {
    url: `/wiki/api/v2/footer-comments/${parameters.id}/likes/users`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: FooterLikeUsersSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the count of likes of specific inline comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the
 * page/blogpost and its corresponding space.
 */
export async function getInlineLikeCount(
  client: Client,
  parameters: GetInlineLikeCount,
  options?: RequestOptions,
): Promise<InlineLikeCount> {
  const config: SendRequestOptions<InlineLikeCount> = {
    url: `/wiki/api/v2/inline-comments/${parameters.id}/likes/count`,
    method: 'GET',
    schema: InlineLikeCountSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the account IDs of likes of specific inline comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the
 * page/blogpost and its corresponding space.
 */
export async function getInlineLikeUsers(
  client: Client,
  parameters: GetInlineLikeUsers,
  options?: RequestOptions,
): Promise<InlineLikeUsers> {
  const config: SendRequestOptions<InlineLikeUsers> = {
    url: `/wiki/api/v2/inline-comments/${parameters.id}/likes/users`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: InlineLikeUsersSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
