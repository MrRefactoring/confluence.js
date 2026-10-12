import { AttachmentsSchema, type Attachments } from '../models/attachments';
import { AttachmentSchema, type Attachment } from '../models/attachment';
import { BlogpostAttachmentsSchema, type BlogpostAttachments } from '../models/blogpostAttachments';
import { CustomContentAttachmentsSchema, type CustomContentAttachments } from '../models/customContentAttachments';
import { LabelAttachmentsSchema, type LabelAttachments } from '../models/labelAttachments';
import { PageAttachmentsSchema, type PageAttachments } from '../models/pageAttachments';
import type { GetAttachments } from '../parameters/getAttachments';
import type { GetAttachmentById } from '../parameters/getAttachmentById';
import type { DeleteAttachment } from '../parameters/deleteAttachment';
import type { GetBlogpostAttachments } from '../parameters/getBlogpostAttachments';
import type { GetCustomContentAttachments } from '../parameters/getCustomContentAttachments';
import type { GetLabelAttachments } from '../parameters/getLabelAttachments';
import type { GetPageAttachments } from '../parameters/getPageAttachments';
import type { GetAttachmentThumbnailById } from '../parameters/getAttachmentThumbnailById';
import { type Client, type RequestOptions, type SendRequestOptions, BufferSchema, type Buffer } from '#/core';

/**
 * Returns all attachments. The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the container of the
 * attachment.
 */
export async function getAttachments(
  client: Client,
  parameters?: GetAttachments,
  options?: RequestOptions,
): Promise<Attachments> {
  const config: SendRequestOptions<Attachments> = {
    url: '/wiki/api/v2/attachments',
    method: 'GET',
    searchParams: {
      sort: parameters?.sort,
      cursor: parameters?.cursor,
      status: parameters?.status,
      mediaType: parameters?.mediaType,
      filename: parameters?.filename,
      limit: parameters?.limit,
    },
    schema: AttachmentsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific attachment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment's container.
 */
export async function getAttachmentById(
  client: Client,
  parameters: GetAttachmentById,
  options?: RequestOptions,
): Promise<Attachment> {
  const config: SendRequestOptions<Attachment> = {
    url: `/wiki/api/v2/attachments/${parameters.id}`,
    method: 'GET',
    searchParams: {
      version: parameters.version,
      'include-labels': parameters.includeLabels,
      'include-properties': parameters.includeProperties,
      'include-operations': parameters.includeOperations,
      'include-versions': parameters.includeVersions,
      'include-version': parameters.includeVersion,
      'include-collaborators': parameters.includeCollaborators,
    },
    schema: AttachmentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Delete an attachment by id.
 *
 * Deleting an attachment moves the attachment to the trash, where it can be restored later. To permanently delete an
 * attachment (or "purge" it), the endpoint must be called on a **trashed** attachment with the following param
 * `purge=true`.
 *
 * **[Permissions](https://support.atlassian.com/confluence-cloud/docs/what-are-confluences-roles/) required**:
 * Permission to view the container of the attachment. Permission to delete attachments in the space.
 * [`manage/content`](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space-permissions/#api-space-permissions-get)
 * permission for the space (if attempting to purge).
 *
 * **Note:** To find the display name for each permission ID, call the [Get available space
 * permissions](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space-permissions/#api-space-permissions-get)
 * API.
 */
export async function deleteAttachment(
  client: Client,
  parameters: DeleteAttachment,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/attachments/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      purge: parameters.purge,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the attachments of specific blog post. The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
 * post and its corresponding space.
 */
export async function getBlogpostAttachments(
  client: Client,
  parameters: GetBlogpostAttachments,
  options?: RequestOptions,
): Promise<BlogpostAttachments> {
  const config: SendRequestOptions<BlogpostAttachments> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/attachments`,
    method: 'GET',
    searchParams: {
      sort: parameters.sort,
      cursor: parameters.cursor,
      status: parameters.status,
      mediaType: parameters.mediaType,
      filename: parameters.filename,
      limit: parameters.limit,
    },
    schema: BlogpostAttachmentsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the attachments of specific custom content. The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the custom
 * content and its corresponding space.
 */
export async function getCustomContentAttachments(
  client: Client,
  parameters: GetCustomContentAttachments,
  options?: RequestOptions,
): Promise<CustomContentAttachments> {
  const config: SendRequestOptions<CustomContentAttachments> = {
    url: `/wiki/api/v2/custom-content/${parameters.id}/attachments`,
    method: 'GET',
    searchParams: {
      sort: parameters.sort,
      cursor: parameters.cursor,
      status: parameters.status,
      mediaType: parameters.mediaType,
      filename: parameters.filename,
      limit: parameters.limit,
    },
    schema: CustomContentAttachmentsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the attachments of specified label. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment and its
 * corresponding space.
 */
export async function getLabelAttachments(
  client: Client,
  parameters: GetLabelAttachments,
  options?: RequestOptions,
): Promise<LabelAttachments> {
  const config: SendRequestOptions<LabelAttachments> = {
    url: `/wiki/api/v2/labels/${parameters.id}/attachments`,
    method: 'GET',
    searchParams: {
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: LabelAttachmentsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the attachments of specific page. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getPageAttachments(
  client: Client,
  parameters: GetPageAttachments,
  options?: RequestOptions,
): Promise<PageAttachments> {
  const config: SendRequestOptions<PageAttachments> = {
    url: `/wiki/api/v2/pages/${parameters.id}/attachments`,
    method: 'GET',
    searchParams: {
      sort: parameters.sort,
      cursor: parameters.cursor,
      status: parameters.status,
      mediaType: parameters.mediaType,
      filename: parameters.filename,
      limit: parameters.limit,
    },
    schema: PageAttachmentsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Redirects the client to a URL that serves an attachment thumbnail's binary data.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment's container.
 */
export async function getAttachmentThumbnailById(
  client: Client,
  parameters: GetAttachmentThumbnailById,
  options?: RequestOptions,
): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: `/wiki/api/v2/attachments/${parameters.id}/thumbnail/download`,
    method: 'GET',
    searchParams: {
      version: parameters.version,
      height: parameters.height,
      width: parameters.width,
    },
    schema: BufferSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
