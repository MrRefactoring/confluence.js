import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class CustomContent {
  constructor(private client: Client) {}

  /**
   * Returns all custom content for a given type within a given blogpost. The number of results is limited by the
   * `limit` parameter and additional results (if available) will be available through the `next` URL present in the
   * `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
   * container of the custom content (blog post), and the corresponding space.
   */
  async getCustomContentByTypeInBlogPost<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInBlogPost,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all custom content for a given type within a given blogpost. The number of results is limited by the
   * `limit` parameter and additional results (if available) will be available through the `next` URL present in the
   * `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
   * container of the custom content (blog post), and the corresponding space.
   */
  async getCustomContentByTypeInBlogPost<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInBlogPost,
    callback?: never,
  ): Promise<T>;
  async getCustomContentByTypeInBlogPost<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInBlogPost,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}/custom-content`,
      method: 'GET',
      params: {
        type: parameters.type,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'body-format': parameters.bodyFormat,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all custom content for a given type. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
   * container of the custom content, and the corresponding space (if different from the container).
   */
  async getCustomContentByType<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all custom content for a given type. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
   * container of the custom content, and the corresponding space (if different from the container).
   */
  async getCustomContentByType<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByType,
    callback?: never,
  ): Promise<T>;
  async getCustomContentByType<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/custom-content',
      method: 'GET',
      params: {
        type: parameters.type,
        id: parameters.id,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'body-format': parameters['body-format'],
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new custom content in the given space, page, blogpost or other custom content.
   *
   * Only one of `spaceId`, `pageId`, `blogPostId`, or `customContentId` is required in the request body.
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create custom content in the space.
   */
  async createCustomContent<T = Models.CustomContent>(
    parameters: Parameters.CreateCustomContent | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new custom content in the given space, page, blogpost or other custom content.
   *
   * Only one of `spaceId`, `pageId`, `blogPostId`, or `customContentId` is required in the request body.
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create custom content in the space.
   */
  async createCustomContent<T = Models.CustomContent>(
    parameters?: Parameters.CreateCustomContent,
    callback?: never,
  ): Promise<T>;
  async createCustomContent<T = Models.CustomContent>(
    parameters?: Parameters.CreateCustomContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/custom-content',
      method: 'POST',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a specific piece of custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
   * container of the custom content, and the corresponding space (if different from the container).
   */
  async getCustomContentById<T = Models.CustomContent>(
    parameters: Parameters.GetCustomContentById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a specific piece of custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
   * container of the custom content, and the corresponding space (if different from the container).
   */
  async getCustomContentById<T = Models.CustomContent>(
    parameters: Parameters.GetCustomContentById,
    callback?: never,
  ): Promise<T>;
  async getCustomContentById<T = Models.CustomContent>(
    parameters: Parameters.GetCustomContentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        version: parameters.version,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a custom content by id.
   *
   * `spaceId` is always required and maximum one of `pageId`, `blogPostId`, or `customContentId` is allowed in the
   * request body. **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content
   * of the page or blogpost and its corresponding space. Permission to update custom content in the space.
   */
  async updateCustomContent<T = Models.CustomContent>(
    parameters: Parameters.UpdateCustomContent,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update a custom content by id.
   *
   * `spaceId` is always required and maximum one of `pageId`, `blogPostId`, or `customContentId` is allowed in the
   * request body. **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content
   * of the page or blogpost and its corresponding space. Permission to update custom content in the space.
   */
  async updateCustomContent<T = Models.CustomContent>(
    parameters: Parameters.UpdateCustomContent,
    callback?: never,
  ): Promise<T>;
  async updateCustomContent<T = Models.CustomContent>(
    parameters: Parameters.UpdateCustomContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete a custom content by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to delete custom content in the space.
   */
  async deleteCustomContent<T = void>(parameters: Parameters.DeleteCustomContent, callback: Callback<T>): Promise<void>;
  /**
   * Delete a custom content by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to delete custom content in the space.
   */
  async deleteCustomContent<T = void>(parameters: Parameters.DeleteCustomContent, callback?: never): Promise<T>;
  async deleteCustomContent<T = void>(
    parameters: Parameters.DeleteCustomContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all custom content for a given type within a given page. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
   * container of the custom content (page), and the corresponding space.
   */
  async getCustomContentByTypeInPage<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInPage,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all custom content for a given type within a given page. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
   * container of the custom content (page), and the corresponding space.
   */
  async getCustomContentByTypeInPage<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInPage,
    callback?: never,
  ): Promise<T>;
  async getCustomContentByTypeInPage<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInPage,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/custom-content`,
      method: 'GET',
      params: {
        type: parameters.type,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'body-format': parameters['body-format'],
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all custom content for a given type within a given space. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and
   * the corresponding space.
   */
  async getCustomContentByTypeInSpace<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInSpace,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all custom content for a given type within a given space. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and
   * the corresponding space.
   */
  async getCustomContentByTypeInSpace<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInSpace,
    callback?: never,
  ): Promise<T>;
  async getCustomContentByTypeInSpace<T = Models.Pagination<Models.CustomContent>>(
    parameters: Parameters.GetCustomContentByTypeInSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.id}/custom-content`,
      method: 'GET',
      params: {
        type: parameters.type,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'body-format': parameters['body-format'],
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
