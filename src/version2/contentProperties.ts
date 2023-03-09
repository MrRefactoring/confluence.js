import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ContentProperties {
  constructor(private client: Client) {}

  /**
   * Retrieves all Content Properties tied to a specified attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
   */
  async getAttachmentContentProperties<T = Models.GetAttachmentContentProperties>(
    parameters: Parameters.GetAttachmentContentProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves all Content Properties tied to a specified attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
   */
  async getAttachmentContentProperties<T = Models.GetAttachmentContentProperties>(
    parameters: Parameters.GetAttachmentContentProperties,
    callback?: never
  ): Promise<T>;
  async getAttachmentContentProperties<T = Models.GetAttachmentContentProperties>(
    parameters: Parameters.GetAttachmentContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.id}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves a specific Content Property by ID that is attached to a specified attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
   */
  async getAttachmentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetAttachmentContentPropertiesById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
   */
  async getAttachmentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetAttachmentContentPropertiesById,
    callback?: never
  ): Promise<T>;
  async getAttachmentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetAttachmentContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.id}/properties/${parameters.propertyId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves all Content Properties tied to a specified blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogpostContentProperties<T = Models.GetBlogpostContentProperties>(
    parameters: Parameters.GetBlogpostContentProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves all Content Properties tied to a specified blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogpostContentProperties<T = Models.GetBlogpostContentProperties>(
    parameters: Parameters.GetBlogpostContentProperties,
    callback?: never
  ): Promise<T>;
  async getBlogpostContentProperties<T = Models.GetBlogpostContentProperties>(
    parameters: Parameters.GetBlogpostContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves a specific Content Property by ID that is attached to a specified blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogpostContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetBlogpostContentPropertiesById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogpostContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetBlogpostContentPropertiesById,
    callback?: never
  ): Promise<T>;
  async getBlogpostContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetBlogpostContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}/properties/${parameters.propertyId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves Content Properties tied to a specified custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content.
   */
  async getCustomContentContentProperties<T = Models.GetCustomContentContentProperties>(
    parameters: Parameters.GetCustomContentContentProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves Content Properties tied to a specified custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content.
   */
  async getCustomContentContentProperties<T = Models.GetCustomContentContentProperties>(
    parameters: Parameters.GetCustomContentContentProperties,
    callback?: never
  ): Promise<T>;
  async getCustomContentContentProperties<T = Models.GetCustomContentContentProperties>(
    parameters: Parameters.GetCustomContentContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves a specific Content Property by ID that is attached to a specified custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getCustomContentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCustomContentContentPropertiesById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getCustomContentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCustomContentContentPropertiesById,
    callback?: never
  ): Promise<T>;
  async getCustomContentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCustomContentContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}/properties/${parameters.propertyId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves Content Properties tied to a specified page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageContentProperties<T = Models.GetPageContentProperties>(
    parameters: Parameters.GetPageContentProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves Content Properties tied to a specified page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageContentProperties<T = Models.GetPageContentProperties>(
    parameters: Parameters.GetPageContentProperties,
    callback?: never
  ): Promise<T>;
  async getPageContentProperties<T = Models.GetPageContentProperties>(
    parameters: Parameters.GetPageContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves a specific Content Property by ID that is attached to a specified page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetPageContentPropertiesById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetPageContentPropertiesById,
    callback?: never
  ): Promise<T>;
  async getPageContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetPageContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/properties/${parameters.propertyId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves Content Properties attached to a specified comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
   */
  async getCommentContentProperties<T = Models.GetCommentContentProperties>(
    parameters: Parameters.GetCommentContentProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves Content Properties attached to a specified comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
   */
  async getCommentContentProperties<T = Models.GetCommentContentProperties>(
    parameters: Parameters.GetCommentContentProperties,
    callback?: never
  ): Promise<T>;
  async getCommentContentProperties<T = Models.GetCommentContentProperties>(
    parameters: Parameters.GetCommentContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/comments/${parameters.id}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves a specific Content Property by ID that is attached to a specified comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
   */
  async getCommentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCommentContentPropertiesById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
   */
  async getCommentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCommentContentPropertiesById,
    callback?: never
  ): Promise<T>;
  async getCommentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCommentContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/comments/${parameters.id}/properties/${parameters.propertyId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
