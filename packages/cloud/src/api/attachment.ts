import { AttachmentsSchema, type Attachments } from '#/models/attachments';
import { AttachmentSchema, type Attachment } from '#/models/attachment';
import { BlogpostAttachmentsSchema, type BlogpostAttachments } from '#/models/blogpostAttachments';
import { CustomContentAttachmentsSchema, type CustomContentAttachments } from '#/models/customContentAttachments';
import { LabelAttachmentsSchema, type LabelAttachments } from '#/models/labelAttachments';
import { PageAttachmentsSchema, type PageAttachments } from '#/models/pageAttachments';
import type { GetAttachments } from '#/parameters/getAttachments';
import type { GetAttachmentById } from '#/parameters/getAttachmentById';
import type { DeleteAttachment } from '#/parameters/deleteAttachment';
import type { GetBlogpostAttachments } from '#/parameters/getBlogpostAttachments';
import type { GetCustomContentAttachments } from '#/parameters/getCustomContentAttachments';
import type { GetLabelAttachments } from '#/parameters/getLabelAttachments';
import type { GetPageAttachments } from '#/parameters/getPageAttachments';
import type { GetAttachmentThumbnailById } from '#/parameters/getAttachmentThumbnailById';
import { type Client, type SendRequestOptions, BufferSchema, type Buffer } from '@confluence.js/core';

/**
 * Returns all attachments. The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the container of the
 * attachment.
 */
export async function getAttachments(client: Client, parameters?: GetAttachments): Promise<Attachments> {
  const config: SendRequestOptions<Attachments> = {
    url: '/attachments',
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
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific attachment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment's container.
 */
export async function getAttachmentById(client: Client, parameters: GetAttachmentById): Promise<Attachment> {
  const config: SendRequestOptions<Attachment> = {
    url: `/attachments/${parameters.id}`,
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
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the container of the
 * attachment. Permission to delete attachments in the space. Permission to administer the space (if attempting to
 * purge).
 */
export async function deleteAttachment(client: Client, parameters: DeleteAttachment): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/attachments/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      purge: parameters.purge,
    },
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
): Promise<BlogpostAttachments> {
  const config: SendRequestOptions<BlogpostAttachments> = {
    url: `/blogposts/${parameters.id}/attachments`,
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
): Promise<CustomContentAttachments> {
  const config: SendRequestOptions<CustomContentAttachments> = {
    url: `/custom-content/${parameters.id}/attachments`,
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
export async function getLabelAttachments(client: Client, parameters: GetLabelAttachments): Promise<LabelAttachments> {
  const config: SendRequestOptions<LabelAttachments> = {
    url: `/labels/${parameters.id}/attachments`,
    method: 'GET',
    searchParams: {
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: LabelAttachmentsSchema,
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
export async function getPageAttachments(client: Client, parameters: GetPageAttachments): Promise<PageAttachments> {
  const config: SendRequestOptions<PageAttachments> = {
    url: `/pages/${parameters.id}/attachments`,
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
): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: `/attachments/${parameters.id}/thumbnail/download`,
    method: 'GET',
    searchParams: {
      version: parameters.version,
      height: parameters.height,
      width: parameters.width,
    },
    schema: BufferSchema,
  };

  return await client.sendRequest(config);
}
