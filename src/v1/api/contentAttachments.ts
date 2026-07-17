import { ContentArraySchema, type ContentArray } from '../models/contentArray';
import { ContentSchema, type Content } from '../models/content';
import type { CreateAttachment } from '../parameters/createAttachment';
import type { CreateOrUpdateAttachments } from '../parameters/createOrUpdateAttachments';
import type { UpdateAttachmentProperties } from '../parameters/updateAttachmentProperties';
import type { UpdateAttachmentData } from '../parameters/updateAttachmentData';
import type { DownloadAttatchment } from '../parameters/downloadAttatchment';
import { type Client, type SendRequestOptions, toFormDataFile, BufferSchema, type Buffer } from '#/core';

/**
 * Adds an attachment to a piece of content. This method only adds a new attachment. If you want to update an existing
 * attachment, use [Create or update attachments](#api-content-id-child-attachment-put).
 *
 * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt). Most client
 * libraries have classes that make it easier to implement multipart posts, like the
 * [MultipartEntityBuilder](https://hc.apache.org/httpcomponents-client-5.1.x/current/httpclient5/apidocs/) Java class
 * provided by Apache HTTP Components.
 *
 * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5), in the case where the form data is
 * text, the charset parameter for the "text/plain" Content-Type may be used to indicate the character encoding used in
 * that part. In the case of this API endpoint, the `comment` body parameter should be sent with `type=text/plain` and
 * `charset=utf-8` values. This will force the charset to be UTF-8.
 *
 * Example: This curl command attaches a file ('example.txt') to a container (id='123') with a comment and
 * `minorEdits`=true.
 *
 * ```bash
 * curl -D- \
 *   -u admin:admin \
 *   -X POST \
 *   -H 'X-Atlassian-Token: nocheck' \
 *   -F 'file=@"example.txt"' \
 *   -F 'minorEdit="true"' \
 *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
 *   https://myhost/wiki/rest/api/content/123/child/attachment
 * ```
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function createAttachment(client: Client, parameters: CreateAttachment): Promise<ContentArray> {
  const formData = new FormData();
  const items = Array.isArray(parameters.attachments) ? parameters.attachments : [parameters.attachments];

  for (const attachment of items) {
    formData.append('file', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<ContentArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/child/attachment`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      status: parameters.status,
    },
    body: formData,
    schema: ContentArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds an attachment to a piece of content. If the attachment already exists for the content, then the attachment is
 * updated (i.e. a new version of the attachment is created).
 *
 * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt). Most client
 * libraries have classes that make it easier to implement multipart posts, like the
 * [MultipartEntityBuilder](https://hc.apache.org/httpcomponents-client-5.1.x/current/httpclient5/apidocs/) Java class
 * provided by Apache HTTP Components.
 *
 * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5), in the case where the form data is
 * text, the charset parameter for the "text/plain" Content-Type may be used to indicate the character encoding used in
 * that part. In the case of this API endpoint, the `comment` body parameter should be sent with `type=text/plain` and
 * `charset=utf-8` values. This will force the charset to be UTF-8.
 *
 * Example: This curl command attaches a file ('example.txt') to a piece of content (id='123') with a comment and
 * `minorEdits`=true. If the 'example.txt' file already exists, it will update it with a new version of the attachment.
 *
 * ```bash
 * curl -D- \
 *   -u admin:admin \
 *   -X PUT \
 *   -H 'X-Atlassian-Token: nocheck' \
 *   -F 'file=@"example.txt"' \
 *   -F 'minorEdit="true"' \
 *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
 *   http://myhost/rest/api/content/123/child/attachment
 * ```
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function createOrUpdateAttachments(
  client: Client,
  parameters: CreateOrUpdateAttachments,
): Promise<ContentArray> {
  const formData = new FormData();
  const items = Array.isArray(parameters.attachments) ? parameters.attachments : [parameters.attachments];

  for (const attachment of items) {
    formData.append('file', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<ContentArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/child/attachment`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      status: parameters.status,
    },
    body: formData,
    schema: ContentArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the attachment properties, i.e. the non-binary data of an attachment like the filename, media-type, comment,
 * and parent container.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function updateAttachmentProperties(
  client: Client,
  parameters: UpdateAttachmentProperties,
): Promise<Content> {
  const config: SendRequestOptions<Content> = {
    url: `/wiki/rest/api/content/${parameters.id}/child/attachment/${parameters.attachmentId}`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: parameters.body,
    schema: ContentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the binary data of an attachment, given the attachment ID, and optionally the comment and the minor edit
 * field.
 *
 * This method is essentially the same as [Create or update attachments](#api-content-id-child-attachment-put), except
 * that it matches the attachment ID rather than the name.
 *
 * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt). Most client
 * libraries have classes that make it easier to implement multipart posts, like the
 * [MultipartEntityBuilder](https://hc.apache.org/httpcomponents-client-5.1.x/current/httpclient5/apidocs/) Java class
 * provided by Apache HTTP Components.
 *
 * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5), in the case where the form data is
 * text, the charset parameter for the "text/plain" Content-Type may be used to indicate the character encoding used in
 * that part. In the case of this API endpoint, the `comment` body parameter should be sent with `type=text/plain` and
 * `charset=utf-8` values. This will force the charset to be UTF-8.
 *
 * Example: This curl command updates an attachment (id='att456') that is attached to a piece of content (id='123') with
 * a comment and `minorEdits`=true.
 *
 * ```bash
 * curl -D- \
 *   -u admin:admin \
 *   -X POST \
 *   -H 'X-Atlassian-Token: nocheck' \
 *   -F 'file=@"example.txt"' \
 *   -F 'minorEdit="true"' \
 *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
 *   http://myhost/rest/api/content/123/child/attachment/att456/data
 * ```
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function updateAttachmentData(client: Client, parameters: UpdateAttachmentData): Promise<Content> {
  const formData = new FormData();
  const items = Array.isArray(parameters.attachment) ? parameters.attachment : [parameters.attachment];

  for (const attachment of items) {
    formData.append('file', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<Content> = {
    url: `/wiki/rest/api/content/${parameters.id}/child/attachment/${parameters.attachmentId}/data`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: formData,
    schema: ContentSchema,
  };

  return await client.sendRequest(config);
}

/** Redirects the client to a URL that serves an attachment's binary data. */
export async function downloadAttatchment(client: Client, parameters: DownloadAttatchment): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: `/wiki/rest/api/content/${parameters.id}/child/attachment/${parameters.attachmentId}/download`,
    method: 'GET',
    searchParams: {
      version: parameters.version,
      status: parameters.status,
    },
    schema: BufferSchema,
  };

  return await client.sendRequest(config);
}
