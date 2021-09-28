import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentProperties {
  constructor(private client: Client) {}

  /**
   * Returns the properties for a piece of content. For more information about content properties, see [Confluence
   * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentProperties<T = Models.ContentPropertyArray>(
    parameters: Parameters.GetContentProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the properties for a piece of content. For more information about content properties, see [Confluence
   * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentProperties<T = Models.ContentPropertyArray>(
    parameters: Parameters.GetContentProperties,
    callback?: never
  ): Promise<T>;
  async getContentProperties<T = Models.ContentPropertyArray>(
    parameters: Parameters.GetContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/property`,
      method: 'GET',
      params: {
        key: parameters.key,
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getContentProperties' });
  }

  /**
   * Creates a property for an existing piece of content. For more information about content properties, see [Confluence
   * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * This is the same as [Create content property for key](#api-content-id-property-key-post) except that the key is
   * specified in the request body instead of as a path parameter.
   *
   * Content properties can also be added when creating a new piece of content by including them in the
   * `metadata.properties` of the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async createContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a property for an existing piece of content. For more information about content properties, see [Confluence
   * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * This is the same as [Create content property for key](#api-content-id-property-key-post) except that the key is
   * specified in the request body instead of as a path parameter.
   *
   * Content properties can also be added when creating a new piece of content by including them in the
   * `metadata.properties` of the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async createContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentProperty,
    callback?: never
  ): Promise<T>;
  async createContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/property`,
      method: 'POST',
      data: {
        key: parameters.key,
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'createContentProperty' });
  }

  /**
   * Returns a content property for a piece of content. For more information, see [Confluence entity
   * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.GetContentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a content property for a piece of content. For more information, see [Confluence entity
   * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.GetContentProperty,
    callback?: never
  ): Promise<T>;
  async getContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.GetContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/property/${parameters.key}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getContentProperty' });
  }

  /**
   * Creates a property for an existing piece of content. For more information about content properties, see [Confluence
   * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * This is the same as [Create content property](#api-content-id-property-post) except that the key is specified as a
   * path parameter instead of in the request body.
   *
   * Content properties can also be added when creating a new piece of content by including them in the
   * `metadata.properties` of the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async createContentPropertyForKey<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentPropertyForKey,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a property for an existing piece of content. For more information about content properties, see [Confluence
   * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * This is the same as [Create content property](#api-content-id-property-post) except that the key is specified as a
   * path parameter instead of in the request body.
   *
   * Content properties can also be added when creating a new piece of content by including them in the
   * `metadata.properties` of the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async createContentPropertyForKey<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentPropertyForKey,
    callback?: never
  ): Promise<T>;
  async createContentPropertyForKey<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentPropertyForKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/property/${parameters.key}`,
      method: 'POST',
      data: {
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'createContentPropertyForKey' });
  }

  /**
   * Updates an existing content property. This method will also create a new property for a piece of content, if the
   * property key does not exist and the property version is 1. For more information about content properties, see
   * [Confluence entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async updateContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.UpdateContentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates an existing content property. This method will also create a new property for a piece of content, if the
   * property key does not exist and the property version is 1. For more information about content properties, see
   * [Confluence entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async updateContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.UpdateContentProperty,
    callback?: never
  ): Promise<T>;
  async updateContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.UpdateContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/property/${parameters.key}`,
      method: 'PUT',
      data: {
        value: parameters.value,
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'updateContentProperty' });
  }

  /**
   * Deletes a content property. For more information about content properties, see [Confluence entity
   * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async deleteContentProperty<T = void>(
    parameters: Parameters.DeleteContentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a content property. For more information about content properties, see [Confluence entity
   * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async deleteContentProperty<T = void>(parameters: Parameters.DeleteContentProperty, callback?: never): Promise<T>;
  async deleteContentProperty<T = void>(
    parameters: Parameters.DeleteContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/property/${parameters.key}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'deleteContentProperty' });
  }
}
