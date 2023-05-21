import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Attachment {
  constructor(private client: Client) {}

  /**
   * Returns a specific attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment's
   * container.
   */
  async getAttachmentById<T = Models.Attachment>(
    parameters: Parameters.GetAttachmentById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a specific attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment's
   * container.
   */
  async getAttachmentById<T = Models.Attachment>(
    parameters: Parameters.GetAttachmentById,
    callback?: never,
  ): Promise<T>;
  async getAttachmentById<T = Models.Attachment>(
    parameters: Parameters.GetAttachmentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.id}`,
      method: 'GET',
      params: {
        version: parameters.version,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the attachments of specific blog post. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
   * post and its corresponding space.
   */
  async getBlogpostAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetBlogpostAttachments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the attachments of specific blog post. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
   * post and its corresponding space.
   */
  async getBlogpostAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetBlogpostAttachments,
    callback?: never,
  ): Promise<T>;
  async getBlogpostAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetBlogpostAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}/attachments`,
      method: 'GET',
      params: {
        sort: parameters.sort,
        cursor: parameters.cursor,
        mediaType: parameters.mediaType,
        filename: parameters.filename,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the attachments of specific custom content. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the custom
   * content and its corresponding space.
   */
  async getCustomContentAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetCustomContentAttachments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the attachments of specific custom content. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the custom
   * content and its corresponding space.
   */
  async getCustomContentAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetCustomContentAttachments,
    callback?: never,
  ): Promise<T>;
  async getCustomContentAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetCustomContentAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}/attachments`,
      method: 'GET',
      params: {
        sort: parameters.sort,
        cursor: parameters.cursor,
        mediaType: parameters.mediaType,
        filename: parameters.filename,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the attachments of specified label. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment and its
   * corresponding space.
   */
  async getLabelAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetLabelAttachments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the attachments of specified label. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment and its
   * corresponding space.
   */
  async getLabelAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetLabelAttachments,
    callback?: never,
  ): Promise<T>;
  async getLabelAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetLabelAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/labels/${parameters.id}/attachments`,
      method: 'GET',
      params: {
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the attachments of specific page. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getPageAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetPageAttachments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the attachments of specific page. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getPageAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetPageAttachments,
    callback?: never,
  ): Promise<T>;
  async getPageAttachments<T = Models.Pagination<Models.Attachment>>(
    parameters: Parameters.GetPageAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/attachments`,
      method: 'GET',
      params: {
        sort: parameters.sort,
        cursor: parameters.cursor,
        mediaType: parameters.mediaType,
        filename: parameters.filename,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
