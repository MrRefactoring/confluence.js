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
  async getAttachmentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetAttachmentContentProperties,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves all Content Properties tied to a specified attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
   */
  async getAttachmentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetAttachmentContentProperties,
    callback?: never,
  ): Promise<T>;
  async getAttachmentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetAttachmentContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.attachmentId}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new attachment property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the attachment.
   */
  async createAttachmentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateAttachmentProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new attachment property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the attachment.
   */
  async createAttachmentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateAttachmentProperty,
    callback?: never,
  ): Promise<T>;
  async createAttachmentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateAttachmentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.attachmentId}/properties`,
      method: 'POST',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
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
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
   */
  async getAttachmentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetAttachmentContentPropertiesById,
    callback?: never,
  ): Promise<T>;
  async getAttachmentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetAttachmentContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.attachmentId}/properties/${parameters.propertyId}`,
      method: 'GET',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update an attachment property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the attachment.
   */
  async updateAttachmentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateAttachmentPropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update an attachment property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the attachment.
   */
  async updateAttachmentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateAttachmentPropertyById,
    callback?: never,
  ): Promise<T>;
  async updateAttachmentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateAttachmentPropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.attachmentId}/properties/${parameters.propertyId}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an attachment property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to attachment the page.
   */
  async deleteAttachmentPropertyById<T = void>(
    parameters: Parameters.DeleteAttachmentPropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a attachment property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to attachment the page.
   */
  async deleteAttachmentPropertyById<T = void>(
    parameters: Parameters.DeleteAttachmentPropertyById,
    callback?: never,
  ): Promise<T>;
  async deleteAttachmentPropertyById<T = void>(
    parameters: Parameters.DeleteAttachmentPropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.attachmentId}/properties/${parameters.propertyId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves all Content Properties tied to a specified blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogpostContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetBlogpostContentProperties,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves all Content Properties tied to a specified blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogpostContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetBlogpostContentProperties,
    callback?: never,
  ): Promise<T>;
  async getBlogpostContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetBlogpostContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.blogpostId}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new blog post property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the blog post.
   */
  async createBlogpostProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateBlogpostProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new blog post property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the blog post.
   */
  async createBlogpostProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateBlogpostProperty,
    callback?: never,
  ): Promise<T>;
  async createBlogpostProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateBlogpostProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.blogpostId}/properties`,
      method: 'POST',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
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
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogpostContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetBlogpostContentPropertiesById,
    callback?: never,
  ): Promise<T>;
  async getBlogpostContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetBlogpostContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.blogpostId}/properties/${parameters.propertyId}`,
      method: 'GET',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a blog post property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the blog post.
   */
  async updateBlogpostPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateBlogpostPropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update a blog post property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the blog post.
   */
  async updateBlogpostPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateBlogpostPropertyById,
    callback?: never,
  ): Promise<T>;
  async updateBlogpostPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateBlogpostPropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.blogpostId}/properties/${parameters.propertyId}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a blog post property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the blog post.
   */
  async deleteBlogpostPropertyById<T = void>(
    parameters: Parameters.DeleteBlogpostPropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a blog post property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the blog post.
   */
  async deleteBlogpostPropertyById<T = void>(
    parameters: Parameters.DeleteBlogpostPropertyById,
    callback?: never,
  ): Promise<T>;
  async deleteBlogpostPropertyById<T = void>(
    parameters: Parameters.DeleteBlogpostPropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.blogpostId}/properties/${parameters.propertyId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves Content Properties tied to a specified custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content.
   */
  async getCustomContentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetCustomContentContentProperties,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves Content Properties tied to a specified custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content.
   */
  async getCustomContentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetCustomContentContentProperties,
    callback?: never,
  ): Promise<T>;
  async getCustomContentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetCustomContentContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.customContentId}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new custom content property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the custom content.
   */
  async createCustomContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateCustomContentProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new custom content property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the custom content.
   */
  async createCustomContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateCustomContentProperty,
    callback?: never,
  ): Promise<T>;
  async createCustomContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateCustomContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.customContentId}/properties`,
      method: 'POST',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
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
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getCustomContentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCustomContentContentPropertiesById,
    callback?: never,
  ): Promise<T>;
  async getCustomContentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCustomContentContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.customContentId}/properties/${parameters.propertyId}`,
      method: 'GET',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a custom content property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the custom content.
   */
  async updateCustomContentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateCustomContentPropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update a custom content property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the custom content.
   */
  async updateCustomContentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateCustomContentPropertyById,
    callback?: never,
  ): Promise<T>;
  async updateCustomContentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateCustomContentPropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.customContentId}/properties/${parameters.propertyId}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a custom content property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the custom content.
   */
  async deleteCustomContentPropertyById<T = void>(
    parameters: Parameters.DeleteCustomContentPropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a custom content property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the custom content.
   */
  async deleteCustomContentPropertyById<T = void>(
    parameters: Parameters.DeleteCustomContentPropertyById,
    callback?: never,
  ): Promise<T>;
  async deleteCustomContentPropertyById<T = void>(
    parameters: Parameters.DeleteCustomContentPropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.customContentId}/properties/${parameters.propertyId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves Content Properties tied to a specified page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetPageContentProperties,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves Content Properties tied to a specified page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetPageContentProperties,
    callback?: never,
  ): Promise<T>;
  async getPageContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetPageContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.pageId}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new page property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the page.
   */
  async createPageProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreatePageProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new page property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the page.
   */
  async createPageProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreatePageProperty,
    callback?: never,
  ): Promise<T>;
  async createPageProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreatePageProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.pageId}/properties`,
      method: 'POST',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
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
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetPageContentPropertiesById,
    callback?: never,
  ): Promise<T>;
  async getPageContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetPageContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.pageId}/properties/${parameters.propertyId}`,
      method: 'GET',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a page property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the page.
   */
  async updatePagePropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdatePagePropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update a page property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the page.
   */
  async updatePagePropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdatePagePropertyById,
    callback?: never,
  ): Promise<T>;
  async updatePagePropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdatePagePropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.pageId}/properties/${parameters.propertyId}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a page property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the page.
   */
  async deletePagePropertyById<T = void>(
    parameters: Parameters.DeletePagePropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a page property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the page.
   */
  async deletePagePropertyById<T = void>(parameters: Parameters.DeletePagePropertyById, callback?: never): Promise<T>;
  async deletePagePropertyById<T = void>(
    parameters: Parameters.DeletePagePropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.pageId}/properties/${parameters.propertyId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves Content Properties attached to a specified comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
   */
  async getCommentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetCommentContentProperties,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves Content Properties attached to a specified comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
   */
  async getCommentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetCommentContentProperties,
    callback?: never,
  ): Promise<T>;
  async getCommentContentProperties<T = Models.Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetCommentContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/comments/${parameters.commentId}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new comment property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the comment.
   */
  async createCommentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateCommentProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new comment property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the comment.
   */
  async createCommentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateCommentProperty,
    callback?: never,
  ): Promise<T>;
  async createCommentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateCommentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/comments/${parameters.commentId}/properties`,
      method: 'POST',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
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
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves a specific Content Property by ID that is attached to a specified comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
   */
  async getCommentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCommentContentPropertiesById,
    callback?: never,
  ): Promise<T>;
  async getCommentContentPropertiesById<T = Models.ContentProperty>(
    parameters: Parameters.GetCommentContentPropertiesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/comments/${parameters.commentId}/properties/${parameters.propertyId}`,
      method: 'GET',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a comment property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the comment.
   */
  async updateCommentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateCommentPropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update a comment property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the comment.
   */
  async updateCommentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateCommentPropertyById,
    callback?: never,
  ): Promise<T>;
  async updateCommentPropertyById<T = Models.ContentProperty>(
    parameters: Parameters.UpdateCommentPropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/comments/${parameters.commentId}/properties/${parameters.propertyId}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': true,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a comment property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the comment.
   */
  async deleteCommentPropertyById<T = void>(
    parameters: Parameters.DeleteCommentPropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a comment property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the comment.
   */
  async deleteCommentPropertyById<T = void>(
    parameters: Parameters.DeleteCommentPropertyById,
    callback?: never,
  ): Promise<T>;
  async deleteCommentPropertyById<T = void>(
    parameters: Parameters.DeleteCommentPropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/comments/${parameters.commentId}/properties/${parameters.propertyId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
