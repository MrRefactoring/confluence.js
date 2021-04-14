import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentAttachments {
  constructor(private client: Client) { }

  /**
   * Returns the attachments for a piece of content.
   *
   * By default, the following objects are expanded: `metadata`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to view the content. If the content is a blog post, 'View' permission
   * for the space is required. */
  async getAttachments<T = Models.ContentArray>(parameters: Parameters.GetAttachments, callback: Callback<T>): Promise<void>;
  /**
   * Returns the attachments for a piece of content.
   *
   * By default, the following objects are expanded: `metadata`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to view the content. If the content is a blog post, 'View' permission
   * for the space is required. */
  async getAttachments<T = Models.ContentArray>(parameters: Parameters.GetAttachments, callback?: never): Promise<T>;
  async getAttachments<T = Models.ContentArray>(parameters: Parameters.GetAttachments, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/child/attachment`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
        filename: parameters.filename,
        mediaType: parameters.mediaType,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getAttachments' });
  }

  /**
   * Adds an attachment to a piece of content. This method only adds a new
   * attachment. If you want to update an existing attachment, use
   * [Create or update attachments](#api-content-id-child-attachment-put).
   *
   * Note, you must set a `X-Atlassian-Token: nocheck` header on the request
   * for this method, otherwise it will be blocked. This protects against XSRF
   * attacks, which is necessary as this method accepts multipart/form-data.
   *
   * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt).
   * Most client libraries have classes that make it easier to implement
   * multipart posts, like the [MultipartEntityBuilder](http://hc.apache.org/httpcomponents-client-5.0.x/current/httpclient5/apidocs/)
   * Java class provided by Apache HTTP Components.
   *
   * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5),
   * in the case where the form data is text,
   * the charset parameter for the "text/plain" Content-Type may be used to
   * indicate the character encoding used in that part. In the case of this
   * API endpoint, the `comment` body parameter should be sent with `type=text/plain`
   * and `charset=utf-8` values. This will force the charset to be UTF-8.
   *
   * Example: This curl command attaches a file ('example.txt') to a container
   * (id='123') with a comment and `minorEdits`=true.
   *
   * ``` bash
   * curl -D- \
   *   -u admin:admin \
   *   -X POST \
   *   -H 'X-Atlassian-Token: nocheck' \
   *   -F 'file=@"example.txt"' \
   *   -F 'minorEdit="true"' \
   *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
   *   http://myhost/rest/api/content/123/child/attachment
   * ```
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to update the content. */
  async createAttachments<T = Models.ContentArray>(parameters: Parameters.CreateAttachments, callback: Callback<T>): Promise<void>;
  /**
   * Adds an attachment to a piece of content. This method only adds a new
   * attachment. If you want to update an existing attachment, use
   * [Create or update attachments](#api-content-id-child-attachment-put).
   *
   * Note, you must set a `X-Atlassian-Token: nocheck` header on the request
   * for this method, otherwise it will be blocked. This protects against XSRF
   * attacks, which is necessary as this method accepts multipart/form-data.
   *
   * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt).
   * Most client libraries have classes that make it easier to implement
   * multipart posts, like the [MultipartEntityBuilder](http://hc.apache.org/httpcomponents-client-5.0.x/current/httpclient5/apidocs/)
   * Java class provided by Apache HTTP Components.
   *
   * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5),
   * in the case where the form data is text,
   * the charset parameter for the "text/plain" Content-Type may be used to
   * indicate the character encoding used in that part. In the case of this
   * API endpoint, the `comment` body parameter should be sent with `type=text/plain`
   * and `charset=utf-8` values. This will force the charset to be UTF-8.
   *
   * Example: This curl command attaches a file ('example.txt') to a container
   * (id='123') with a comment and `minorEdits`=true.
   *
   * ``` bash
   * curl -D- \
   *   -u admin:admin \
   *   -X POST \
   *   -H 'X-Atlassian-Token: nocheck' \
   *   -F 'file=@"example.txt"' \
   *   -F 'minorEdit="true"' \
   *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
   *   http://myhost/rest/api/content/123/child/attachment
   * ```
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to update the content. */
  async createAttachments<T = Models.ContentArray>(parameters: Parameters.CreateAttachments, callback?: never): Promise<T>;
  async createAttachments<T = Models.ContentArray>(parameters: Parameters.CreateAttachments, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/child/attachment`,
      method: 'POST',
      params: {
        status: parameters.status,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createAttachments' });
  }

  /**
   * Adds an attachment to a piece of content. If the attachment already exists
   * for the content, then the attachment is updated (i.e. a new version of the
   * attachment is created).
   *
   * Note, you must set a `X-Atlassian-Token: nocheck` header on the request
   * for this method, otherwise it will be blocked. This protects against XSRF
   * attacks, which is necessary as this method accepts multipart/form-data.
   *
   * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt).
   * Most client libraries have classes that make it easier to implement
   * multipart posts, like the [MultipartEntityBuilder](http://hc.apache.org/httpcomponents-client-5.0.x/current/httpclient5/apidocs/)
   * Java class provided by Apache HTTP Components.
   *
   * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5),
   * in the case where the form data is text,
   * the charset parameter for the "text/plain" Content-Type may be used to
   * indicate the character encoding used in that part. In the case of this
   * API endpoint, the `comment` body parameter should be sent with `type=text/plain`
   * and `charset=utf-8` values. This will force the charset to be UTF-8.
   *
   * Example: This curl command attaches a file ('example.txt') to a piece of
   * content (id='123') with a comment and `minorEdits`=true. If the 'example.txt'
   * file already exists, it will update it with a new version of the attachment.
   *
   * ``` bash
   * curl -D- \
   *   -u admin:admin \
   *   -X PUT \
   *   -H 'X-Atlassian-Token: nocheck' \
   *   -F 'file=@"example.txt"' \
   *   -F 'minorEdit="true"' \
   *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
   *   http://myhost/rest/api/content/123/child/attachment
   * ```
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to update the content. */
  async createOrUpdateAttachments<T = Models.ContentArray>(parameters: Parameters.CreateOrUpdateAttachments, callback: Callback<T>): Promise<void>;
  /**
   * Adds an attachment to a piece of content. If the attachment already exists
   * for the content, then the attachment is updated (i.e. a new version of the
   * attachment is created).
   *
   * Note, you must set a `X-Atlassian-Token: nocheck` header on the request
   * for this method, otherwise it will be blocked. This protects against XSRF
   * attacks, which is necessary as this method accepts multipart/form-data.
   *
   * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt).
   * Most client libraries have classes that make it easier to implement
   * multipart posts, like the [MultipartEntityBuilder](http://hc.apache.org/httpcomponents-client-5.0.x/current/httpclient5/apidocs/)
   * Java class provided by Apache HTTP Components.
   *
   * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5),
   * in the case where the form data is text,
   * the charset parameter for the "text/plain" Content-Type may be used to
   * indicate the character encoding used in that part. In the case of this
   * API endpoint, the `comment` body parameter should be sent with `type=text/plain`
   * and `charset=utf-8` values. This will force the charset to be UTF-8.
   *
   * Example: This curl command attaches a file ('example.txt') to a piece of
   * content (id='123') with a comment and `minorEdits`=true. If the 'example.txt'
   * file already exists, it will update it with a new version of the attachment.
   *
   * ``` bash
   * curl -D- \
   *   -u admin:admin \
   *   -X PUT \
   *   -H 'X-Atlassian-Token: nocheck' \
   *   -F 'file=@"example.txt"' \
   *   -F 'minorEdit="true"' \
   *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
   *   http://myhost/rest/api/content/123/child/attachment
   * ```
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to update the content. */
  async createOrUpdateAttachments<T = Models.ContentArray>(parameters: Parameters.CreateOrUpdateAttachments, callback?: never): Promise<T>;
  async createOrUpdateAttachments<T = Models.ContentArray>(parameters: Parameters.CreateOrUpdateAttachments, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/child/attachment`,
      method: 'PUT',
      params: {
        status: parameters.status,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createOrUpdateAttachments' });
  }

  /**
   * Updates the attachment properties, i.e. the non-binary data of an attachment
   * like the filename, media-type, comment, and parent container.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to update the content. */
  async updateAttachmentProperties<T = Models.Content>(parameters: Parameters.UpdateAttachmentProperties, callback: Callback<T>): Promise<void>;
  /**
   * Updates the attachment properties, i.e. the non-binary data of an attachment
   * like the filename, media-type, comment, and parent container.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to update the content. */
  async updateAttachmentProperties<T = Models.Content>(parameters: Parameters.UpdateAttachmentProperties, callback?: never): Promise<T>;
  async updateAttachmentProperties<T = Models.Content>(parameters: Parameters.UpdateAttachmentProperties, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/child/attachment/${parameters.attachmentId}`,
      method: 'PUT',
      data: parameters.body,
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateAttachmentProperties' });
  }

  /**
   * Updates the binary data of an attachment, given the attachment ID, and
   * optionally the comment and the minor edit field.
   *
   * This method is essentially the same as [Create or update attachments](#api-content-id-child-attachment-put),
   * except that it matches the attachment ID rather than the name.
   *
   * Note, you must set a `X-Atlassian-Token: nocheck` header on the request
   * for this method, otherwise it will be blocked. This protects against XSRF
   * attacks, which is necessary as this method accepts multipart/form-data.
   *
   * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt).
   * Most client libraries have classes that make it easier to implement
   * multipart posts, like the [MultipartEntityBuilder](http://hc.apache.org/httpcomponents-client-5.0.x/current/httpclient5/apidocs/)
   * Java class provided by Apache HTTP Components.
   *
   * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5),
   * in the case where the form data is text,
   * the charset parameter for the "text/plain" Content-Type may be used to
   * indicate the character encoding used in that part. In the case of this
   * API endpoint, the `comment` body parameter should be sent with `type=text/plain`
   * and `charset=utf-8` values. This will force the charset to be UTF-8.
   *
   * Example: This curl command updates an attachment (id='att456') that is attached
   * to a piece of content (id='123') with a comment and `minorEdits`=true.
   *
   * ``` bash
   * curl -D- \
   *   -u admin:admin \
   *   -X POST \
   *   -H 'X-Atlassian-Token: nocheck' \
   *   -F 'file=@"example.txt"' \
   *   -F 'minorEdit="true"' \
   *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
   *   http://myhost/rest/api/content/123/child/attachment/att456/data
   * ```
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to update the content. */
  async updateAttachmentData<T = Models.Content>(parameters: Parameters.UpdateAttachmentData, callback: Callback<T>): Promise<void>;
  /**
   * Updates the binary data of an attachment, given the attachment ID, and
   * optionally the comment and the minor edit field.
   *
   * This method is essentially the same as [Create or update attachments](#api-content-id-child-attachment-put),
   * except that it matches the attachment ID rather than the name.
   *
   * Note, you must set a `X-Atlassian-Token: nocheck` header on the request
   * for this method, otherwise it will be blocked. This protects against XSRF
   * attacks, which is necessary as this method accepts multipart/form-data.
   *
   * The media type 'multipart/form-data' is defined in [RFC 7578](https://www.ietf.org/rfc/rfc7578.txt).
   * Most client libraries have classes that make it easier to implement
   * multipart posts, like the [MultipartEntityBuilder](http://hc.apache.org/httpcomponents-client-5.0.x/current/httpclient5/apidocs/)
   * Java class provided by Apache HTTP Components.
   *
   * Note, according to [RFC 7578](https://tools.ietf.org/html/rfc7578#section-4.5),
   * in the case where the form data is text,
   * the charset parameter for the "text/plain" Content-Type may be used to
   * indicate the character encoding used in that part. In the case of this
   * API endpoint, the `comment` body parameter should be sent with `type=text/plain`
   * and `charset=utf-8` values. This will force the charset to be UTF-8.
   *
   * Example: This curl command updates an attachment (id='att456') that is attached
   * to a piece of content (id='123') with a comment and `minorEdits`=true.
   *
   * ``` bash
   * curl -D- \
   *   -u admin:admin \
   *   -X POST \
   *   -H 'X-Atlassian-Token: nocheck' \
   *   -F 'file=@"example.txt"' \
   *   -F 'minorEdit="true"' \
   *   -F 'comment="Example attachment comment"; type=text/plain; charset=utf-8' \
   *   http://myhost/rest/api/content/123/child/attachment/att456/data
   * ```
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to update the content. */
  async updateAttachmentData<T = Models.Content>(parameters: Parameters.UpdateAttachmentData, callback?: never): Promise<T>;
  async updateAttachmentData<T = Models.Content>(parameters: Parameters.UpdateAttachmentData, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/child/attachment/${parameters.attachmentId}/data`,
      method: 'POST',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateAttachmentData' });
  }
}
