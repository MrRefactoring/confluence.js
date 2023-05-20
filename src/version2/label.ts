import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Label {
  constructor(private client: Client) {}

  /**
   * Returns the labels of specific attachment. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
   * attachment and its corresponding space.
   */
  async getAttachmentLabels<T = Models.GetAttachmentLabels>(
    parameters: Parameters.GetAttachmentLabels,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the labels of specific attachment. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
   * attachment and its corresponding space.
   */
  async getAttachmentLabels<T = Models.GetAttachmentLabels>(
    parameters: Parameters.GetAttachmentLabels,
    callback?: never,
  ): Promise<T>;
  async getAttachmentLabels<T = Models.GetAttachmentLabels>(
    parameters: Parameters.GetAttachmentLabels,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.id}/labels`,
      method: 'GET',
      params: {
        prefix: parameters.prefix,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the labels of specific blog post. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
   * post and its corresponding space.
   */
  async getBlogPostLabels<T = Models.GetBlogPostLabels>(
    parameters: Parameters.GetBlogPostLabels,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the labels of specific blog post. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
   * post and its corresponding space.
   */
  async getBlogPostLabels<T = Models.GetBlogPostLabels>(
    parameters: Parameters.GetBlogPostLabels,
    callback?: never,
  ): Promise<T>;
  async getBlogPostLabels<T = Models.GetBlogPostLabels>(
    parameters: Parameters.GetBlogPostLabels,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}/labels`,
      method: 'GET',
      params: {
        prefix: parameters.prefix,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the labels for a specific piece of custom content. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and
   * its corresponding space.
   */
  async getCustomContentLabels<T = Models.GetCustomContentLabels>(
    parameters: Parameters.GetCustomContentLabels,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the labels for a specific piece of custom content. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and
   * its corresponding space.
   */
  async getCustomContentLabels<T = Models.GetCustomContentLabels>(
    parameters: Parameters.GetCustomContentLabels,
    callback?: never,
  ): Promise<T>;
  async getCustomContentLabels<T = Models.GetCustomContentLabels>(
    parameters: Parameters.GetCustomContentLabels,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}/labels`,
      method: 'GET',
      params: {
        prefix: parameters.prefix,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the labels of specific page. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getPageLabels<T = Models.GetPageLabels>(
    parameters: Parameters.GetPageLabels,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the labels of specific page. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getPageLabels<T = Models.GetPageLabels>(parameters: Parameters.GetPageLabels, callback?: never): Promise<T>;
  async getPageLabels<T = Models.GetPageLabels>(
    parameters: Parameters.GetPageLabels,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/labels`,
      method: 'GET',
      params: {
        prefix: parameters.prefix,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
