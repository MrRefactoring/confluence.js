import { AttachmentVersionsSchema, type AttachmentVersions } from '../models/attachmentVersions';
import { BlogPostVersionsSchema, type BlogPostVersions } from '../models/blogPostVersions';
import { PageVersionsSchema, type PageVersions } from '../models/pageVersions';
import { FooterCommentVersionsSchema, type FooterCommentVersions } from '../models/footerCommentVersions';
import { InlineCommentVersionsSchema, type InlineCommentVersions } from '../models/inlineCommentVersions';
import { DetailedVersionSchema, type DetailedVersion } from '../models/detailedVersion';
import { CustomContentVersionsSchema, type CustomContentVersions } from '../models/customContentVersions';
import type { GetAttachmentVersions } from '../parameters/getAttachmentVersions';
import type { GetBlogPostVersions } from '../parameters/getBlogPostVersions';
import type { GetPageVersions } from '../parameters/getPageVersions';
import type { GetFooterCommentVersions } from '../parameters/getFooterCommentVersions';
import type { GetInlineCommentVersions } from '../parameters/getInlineCommentVersions';
import type { GetAttachmentVersionDetails } from '../parameters/getAttachmentVersionDetails';
import type { GetBlogPostVersionDetails } from '../parameters/getBlogPostVersionDetails';
import type { GetPageVersionDetails } from '../parameters/getPageVersionDetails';
import type { GetCustomContentVersions } from '../parameters/getCustomContentVersions';
import type { GetCustomContentVersionDetails } from '../parameters/getCustomContentVersionDetails';
import type { GetFooterCommentVersionDetails } from '../parameters/getFooterCommentVersionDetails';
import type { GetInlineCommentVersionDetails } from '../parameters/getInlineCommentVersionDetails';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the versions of specific attachment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment and its
 * corresponding space.
 */
export async function getAttachmentVersions(
  client: Client,
  parameters: GetAttachmentVersions,
): Promise<AttachmentVersions> {
  const config: SendRequestOptions<AttachmentVersions> = {
    url: `/wiki/api/v2/attachments/${parameters.id}/versions`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: AttachmentVersionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the versions of specific blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
 * corresponding space.
 */
export async function getBlogPostVersions(client: Client, parameters: GetBlogPostVersions): Promise<BlogPostVersions> {
  const config: SendRequestOptions<BlogPostVersions> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/versions`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: BlogPostVersionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the versions of specific page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
 * corresponding space.
 */
export async function getPageVersions(client: Client, parameters: GetPageVersions): Promise<PageVersions> {
  const config: SendRequestOptions<PageVersions> = {
    url: `/wiki/api/v2/pages/${parameters.id}/versions`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: PageVersionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the versions of the specified footer comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blog post and its corresponding space.
 */
export async function getFooterCommentVersions(
  client: Client,
  parameters: GetFooterCommentVersions,
): Promise<FooterCommentVersions> {
  const config: SendRequestOptions<FooterCommentVersions> = {
    url: `/wiki/api/v2/footer-comments/${parameters.id}/versions`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: FooterCommentVersionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the versions of the specified inline comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blog post and its corresponding space.
 */
export async function getInlineCommentVersions(
  client: Client,
  parameters: GetInlineCommentVersions,
): Promise<InlineCommentVersions> {
  const config: SendRequestOptions<InlineCommentVersions> = {
    url: `/wiki/api/v2/inline-comments/${parameters.id}/versions`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: InlineCommentVersionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves version details for the specified attachment and version number.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
 */
export async function getAttachmentVersionDetails(
  client: Client,
  parameters: GetAttachmentVersionDetails,
): Promise<DetailedVersion> {
  const config: SendRequestOptions<DetailedVersion> = {
    url: `/wiki/api/v2/attachments/${parameters.attachmentId}/versions/${parameters.versionNumber}`,
    method: 'GET',
    schema: DetailedVersionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves version details for the specified blog post and version number.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
 */
export async function getBlogPostVersionDetails(
  client: Client,
  parameters: GetBlogPostVersionDetails,
): Promise<DetailedVersion> {
  const config: SendRequestOptions<DetailedVersion> = {
    url: `/wiki/api/v2/blogposts/${parameters.blogpostId}/versions/${parameters.versionNumber}`,
    method: 'GET',
    schema: DetailedVersionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves version details for the specified page and version number.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
 */
export async function getPageVersionDetails(
  client: Client,
  parameters: GetPageVersionDetails,
): Promise<DetailedVersion> {
  const config: SendRequestOptions<DetailedVersion> = {
    url: `/wiki/api/v2/pages/${parameters.pageId}/versions/${parameters.versionNumber}`,
    method: 'GET',
    schema: DetailedVersionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the versions of specific custom content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and its
 * corresponding page and space.
 */
export async function getCustomContentVersions(
  client: Client,
  parameters: GetCustomContentVersions,
): Promise<CustomContentVersions> {
  const config: SendRequestOptions<CustomContentVersions> = {
    url: `/wiki/api/v2/custom-content/${parameters.customContentId}/versions`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: CustomContentVersionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves version details for the specified custom content and version number.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
 */
export async function getCustomContentVersionDetails(
  client: Client,
  parameters: GetCustomContentVersionDetails,
): Promise<DetailedVersion> {
  const config: SendRequestOptions<DetailedVersion> = {
    url: `/wiki/api/v2/custom-content/${parameters.customContentId}/versions/${parameters.versionNumber}`,
    method: 'GET',
    schema: DetailedVersionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves version details for the specified footer comment version.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blog post and its corresponding space.
 */
export async function getFooterCommentVersionDetails(
  client: Client,
  parameters: GetFooterCommentVersionDetails,
): Promise<DetailedVersion> {
  const config: SendRequestOptions<DetailedVersion> = {
    url: `/wiki/api/v2/footer-comments/${parameters.id}/versions/${parameters.versionNumber}`,
    method: 'GET',
    schema: DetailedVersionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves version details for the specified inline comment version.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blog post and its corresponding space.
 */
export async function getInlineCommentVersionDetails(
  client: Client,
  parameters: GetInlineCommentVersionDetails,
): Promise<DetailedVersion> {
  const config: SendRequestOptions<DetailedVersion> = {
    url: `/wiki/api/v2/inline-comments/${parameters.id}/versions/${parameters.versionNumber}`,
    method: 'GET',
    schema: DetailedVersionSchema,
  };

  return await client.sendRequest(config);
}
