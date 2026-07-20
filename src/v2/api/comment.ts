import { AttachmentCommentsSchema, type AttachmentComments } from '../models/attachmentComments';
import { CustomContentCommentsSchema, type CustomContentComments } from '../models/customContentComments';
import { PageFooterCommentsSchema, type PageFooterComments } from '../models/pageFooterComments';
import { PageInlineCommentsSchema, type PageInlineComments } from '../models/pageInlineComments';
import { BlogPostFooterCommentsSchema, type BlogPostFooterComments } from '../models/blogPostFooterComments';
import { BlogPostInlineCommentsSchema, type BlogPostInlineComments } from '../models/blogPostInlineComments';
import { FooterCommentsSchema, type FooterComments } from '../models/footerComments';
import { FooterCommentSchema, type FooterComment } from '../models/footerComment';
import { FooterCommentChildrenSchema, type FooterCommentChildren } from '../models/footerCommentChildren';
import { InlineCommentsSchema, type InlineComments } from '../models/inlineComments';
import { InlineCommentSchema, type InlineComment } from '../models/inlineComment';
import { InlineCommentChildrenGetSchema, type InlineCommentChildrenGet } from '../models/inlineCommentChildrenGet';
import type { GetAttachmentComments } from '../parameters/getAttachmentComments';
import type { GetCustomContentComments } from '../parameters/getCustomContentComments';
import type { GetPageFooterComments } from '../parameters/getPageFooterComments';
import type { GetPageInlineComments } from '../parameters/getPageInlineComments';
import type { GetBlogPostFooterComments } from '../parameters/getBlogPostFooterComments';
import type { GetBlogPostInlineComments } from '../parameters/getBlogPostInlineComments';
import type { GetFooterComments } from '../parameters/getFooterComments';
import type { CreateFooterComment } from '../parameters/createFooterComment';
import type { GetFooterCommentChildren } from '../parameters/getFooterCommentChildren';
import type { GetInlineComments } from '../parameters/getInlineComments';
import type { CreateInlineComment } from '../parameters/createInlineComment';
import type { GetInlineCommentChildren } from '../parameters/getInlineCommentChildren';
import type { GetFooterCommentById } from '../parameters/getFooterCommentById';
import type { UpdateFooterComment } from '../parameters/updateFooterComment';
import type { DeleteFooterComment } from '../parameters/deleteFooterComment';
import type { GetInlineCommentById } from '../parameters/getInlineCommentById';
import type { UpdateInlineComment } from '../parameters/updateInlineComment';
import type { DeleteInlineComment } from '../parameters/deleteInlineComment';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the comments of the specific attachment. The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment and its
 * corresponding containers.
 */
export async function getAttachmentComments(
  client: Client,
  parameters: GetAttachmentComments,
): Promise<AttachmentComments> {
  const config: SendRequestOptions<AttachmentComments> = {
    url: `/wiki/api/v2/attachments/${parameters.id}/footer-comments`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
      version: parameters.version,
    },
    schema: AttachmentCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the comments of the specific custom content. The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and its
 * corresponding containers.
 */
export async function getCustomContentComments(
  client: Client,
  parameters: GetCustomContentComments,
): Promise<CustomContentComments> {
  const config: SendRequestOptions<CustomContentComments> = {
    url: `/wiki/api/v2/custom-content/${parameters.id}/footer-comments`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: CustomContentCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the root footer comments of specific page. The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getPageFooterComments(
  client: Client,
  parameters: GetPageFooterComments,
): Promise<PageFooterComments> {
  const config: SendRequestOptions<PageFooterComments> = {
    url: `/wiki/api/v2/pages/${parameters.id}/footer-comments`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      status: parameters.status,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: PageFooterCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the root inline comments of specific page. The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getPageInlineComments(
  client: Client,
  parameters: GetPageInlineComments,
): Promise<PageInlineComments> {
  const config: SendRequestOptions<PageInlineComments> = {
    url: `/wiki/api/v2/pages/${parameters.id}/inline-comments`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      status: parameters.status,
      'resolution-status': parameters.resolutionStatus,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: PageInlineCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the root footer comments of specific blog post. The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
 * post and its corresponding space.
 */
export async function getBlogPostFooterComments(
  client: Client,
  parameters: GetBlogPostFooterComments,
): Promise<BlogPostFooterComments> {
  const config: SendRequestOptions<BlogPostFooterComments> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/footer-comments`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      status: parameters.status,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: BlogPostFooterCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the root inline comments of specific blog post. The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
 * post and its corresponding space.
 */
export async function getBlogPostInlineComments(
  client: Client,
  parameters: GetBlogPostInlineComments,
): Promise<BlogPostInlineComments> {
  const config: SendRequestOptions<BlogPostInlineComments> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/inline-comments`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      status: parameters.status,
      'resolution-status': parameters.resolutionStatus,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: BlogPostInlineCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all footer comments. The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the
 * container and its corresponding space.
 */
export async function getFooterComments(client: Client, parameters?: GetFooterComments): Promise<FooterComments> {
  const config: SendRequestOptions<FooterComments> = {
    url: '/wiki/api/v2/footer-comments',
    method: 'GET',
    searchParams: {
      'body-format': parameters?.bodyFormat,
      sort: parameters?.sort,
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: FooterCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Create a footer comment.
 *
 * The footer comment can be made against several locations:
 *
 * - At the top level (specifying pageId or blogPostId in the request body)
 * - As a reply (specifying parentCommentId in the request body)
 * - Against an attachment (note: this is different than the comments added via the attachment properties page on the UI,
 *   which are referred to as version comments)
 * - Against a custom content
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space. Permission to create comments in the space.
 */
export async function createFooterComment(client: Client, parameters: CreateFooterComment): Promise<FooterComment> {
  const config: SendRequestOptions<FooterComment> = {
    url: '/wiki/api/v2/footer-comments',
    method: 'POST',
    body: {
      blogPostId: parameters.blogPostId,
      pageId: parameters.pageId,
      parentCommentId: parameters.parentCommentId,
      attachmentId: parameters.attachmentId,
      customContentId: parameters.customContentId,
      body: parameters.body,
    },
    schema: FooterCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the children footer comments of specific comment. The number of results is limited by the `limit` parameter
 * and additional results (if available) will be available through the `next` URL present in the `Link` response
 * header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getFooterCommentChildren(
  client: Client,
  parameters: GetFooterCommentChildren,
): Promise<FooterCommentChildren> {
  const config: SendRequestOptions<FooterCommentChildren> = {
    url: `/wiki/api/v2/footer-comments/${parameters.id}/children`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: FooterCommentChildrenSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all inline comments. The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getInlineComments(client: Client, parameters?: GetInlineComments): Promise<InlineComments> {
  const config: SendRequestOptions<InlineComments> = {
    url: '/wiki/api/v2/inline-comments',
    method: 'GET',
    searchParams: {
      'body-format': parameters?.bodyFormat,
      sort: parameters?.sort,
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: InlineCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Create an inline comment. This can be at the top level (specifying pageId or blogPostId in the request body) or as a
 * reply (specifying parentCommentId in the request body). Note the inlineCommentProperties object in the request body
 * is used to select the text the inline comment should be tied to. This is what determines the text highlighting when
 * viewing a page in Confluence.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space. Permission to create comments in the space.
 */
export async function createInlineComment(client: Client, parameters: CreateInlineComment): Promise<InlineComment> {
  const config: SendRequestOptions<InlineComment> = {
    url: '/wiki/api/v2/inline-comments',
    method: 'POST',
    body: {
      blogPostId: parameters.blogPostId,
      pageId: parameters.pageId,
      parentCommentId: parameters.parentCommentId,
      body: parameters.body,
      inlineCommentProperties: parameters.inlineCommentProperties,
    },
    schema: InlineCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the children inline comments of specific comment. The number of results is limited by the `limit` parameter
 * and additional results (if available) will be available through the `next` URL present in the `Link` response
 * header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getInlineCommentChildren(
  client: Client,
  parameters: GetInlineCommentChildren,
): Promise<InlineCommentChildrenGet> {
  const config: SendRequestOptions<InlineCommentChildrenGet> = {
    url: `/wiki/api/v2/inline-comments/${parameters.id}/children`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: InlineCommentChildrenGetSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a footer comment by id
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the
 * container and its corresponding space.
 */
export async function getFooterCommentById(client: Client, parameters: GetFooterCommentById): Promise<FooterComment> {
  const config: SendRequestOptions<FooterComment> = {
    url: `/wiki/api/v2/footer-comments/${parameters.commentId}`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      version: parameters.version,
      'include-properties': parameters.includeProperties,
      'include-operations': parameters.includeOperations,
      'include-likes': parameters.includeLikes,
      'include-versions': parameters.includeVersions,
      'include-version': parameters.includeVersion,
    },
    schema: FooterCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a footer comment. This can be used to update the body text of a comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space. Permission to create comments in the space.
 */
export async function updateFooterComment(client: Client, parameters: UpdateFooterComment): Promise<FooterComment> {
  const config: SendRequestOptions<FooterComment> = {
    url: `/wiki/api/v2/footer-comments/${parameters.commentId}`,
    method: 'PUT',
    body: parameters.body,
    schema: FooterCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a footer comment. This is a permanent deletion and cannot be reverted.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space. Permission to delete comments in the space.
 */
export async function deleteFooterComment(client: Client, parameters: DeleteFooterComment): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/footer-comments/${parameters.commentId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves an inline comment by id
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space.
 */
export async function getInlineCommentById(client: Client, parameters: GetInlineCommentById): Promise<InlineComment> {
  const config: SendRequestOptions<InlineComment> = {
    url: `/wiki/api/v2/inline-comments/${parameters.commentId}`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      version: parameters.version,
      'include-properties': parameters.includeProperties,
      'include-operations': parameters.includeOperations,
      'include-likes': parameters.includeLikes,
      'include-versions': parameters.includeVersions,
      'include-version': parameters.includeVersion,
    },
    schema: InlineCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update an inline comment. This can be used to update the body text of a comment and/or to resolve the comment
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space. Permission to create comments in the space.
 */
export async function updateInlineComment(client: Client, parameters: UpdateInlineComment): Promise<InlineComment> {
  const config: SendRequestOptions<InlineComment> = {
    url: `/wiki/api/v2/inline-comments/${parameters.commentId}`,
    method: 'PUT',
    body: {
      version: parameters.version,
      body: parameters.body,
      resolved: parameters.resolved,
    },
    schema: InlineCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an inline comment. This is a permanent deletion and cannot be reverted.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space. Permission to delete comments in the space.
 */
export async function deleteInlineComment(client: Client, parameters: DeleteInlineComment): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/inline-comments/${parameters.commentId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
