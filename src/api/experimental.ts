import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Experimental {
  constructor(private client: Client) {}

  /**
   * Moves a pagetree rooted at a page to the space's trash:
   *
   * - If the content's type is `page` and its status is `current`, it will be trashed including all its descendants.
   * - For every other combination of content type and status, this API is not supported.
   *
   * This API accepts the pageTree delete request and returns a task ID. The delete process happens asynchronously.
   *
   * Use the `/longtask/<taskId>` REST API to get the copy task status.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Delete' permission for the space that the
   * content is in.
   */
  async deletePageTree<T = Models.LongTask>(
    parameters: Parameters.DeletePageTree,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Moves a pagetree rooted at a page to the space's trash:
   *
   * - If the content's type is `page` and its status is `current`, it will be trashed including all its descendants.
   * - For every other combination of content type and status, this API is not supported.
   *
   * This API accepts the pageTree delete request and returns a task ID. The delete process happens asynchronously.
   *
   * Use the `/longtask/<taskId>` REST API to get the copy task status.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Delete' permission for the space that the
   * content is in.
   */
  async deletePageTree<T = Models.LongTask>(parameters: Parameters.DeletePageTree, callback?: never): Promise<T>;
  async deletePageTree<T = Models.LongTask>(
    parameters: Parameters.DeletePageTree,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/pageTree`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of labels associated with a space. Can provide a prefix as well as other filters to select different
   * types of labels.
   */
  async getLabelsForSpace<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of labels associated with a space. Can provide a prefix as well as other filters to select different
   * types of labels.
   */
  async getLabelsForSpace<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForSpace,
    callback?: never
  ): Promise<T>;
  async getLabelsForSpace<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/label`,
      method: 'GET',
      params: {
        prefix: parameters.prefix,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds labels to a piece of content. Does not modify the existing labels.
   *
   * Notes:
   *
   * - Labels can also be added when creating content ([Create content](#api-content-post)).
   * - Labels can be updated when updating content ([Update content](#api-content-id-put)). This will delete the existing
   *   labels and replace them with the labels in the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async addLabelsToSpace<T = Models.LabelArray>(
    parameters: Parameters.AddLabelsToSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Adds labels to a piece of content. Does not modify the existing labels.
   *
   * Notes:
   *
   * - Labels can also be added when creating content ([Create content](#api-content-post)).
   * - Labels can be updated when updating content ([Update content](#api-content-id-put)). This will delete the existing
   *   labels and replace them with the labels in the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async addLabelsToSpace<T = Models.LabelArray>(parameters: Parameters.AddLabelsToSpace, callback?: never): Promise<T>;
  async addLabelsToSpace<T = Models.LabelArray>(
    parameters: Parameters.AddLabelsToSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/label`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  async deleteLabelFromSpace<T = void>(
    parameters: Parameters.DeleteLabelFromSpace,
    callback: Callback<T>
  ): Promise<void>;
  async deleteLabelFromSpace<T = void>(parameters: Parameters.DeleteLabelFromSpace, callback?: never): Promise<T>;
  async deleteLabelFromSpace<T = void>(
    parameters: Parameters.DeleteLabelFromSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/label`,
      method: 'DELETE',
      params: {
        name: parameters.name,
        prefix: parameters.prefix,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the properties for a user as list of property keys. For more information about user properties, see
   * [Confluence entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   * `Note`, these properties stored against a user are on a Confluence site level and not space/content level.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getUserProperties<T = Models.UserPropertyKeyArray>(
    parameters: Parameters.GetUserProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the properties for a user as list of property keys. For more information about user properties, see
   * [Confluence entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
   * `Note`, these properties stored against a user are on a Confluence site level and not space/content level.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getUserProperties<T = Models.UserPropertyKeyArray>(
    parameters: Parameters.GetUserProperties,
    callback?: never
  ): Promise<T>;
  async getUserProperties<T = Models.UserPropertyKeyArray>(
    parameters: Parameters.GetUserProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/${parameters.userId}/property`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the property corresponding to `key` for a user. For more information about user properties, see [Confluence
   * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these
   * properties stored against a user are on a Confluence site level and not space/content level.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getUserProperty<T = Models.UserProperty>(
    parameters: Parameters.GetUserProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the property corresponding to `key` for a user. For more information about user properties, see [Confluence
   * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these
   * properties stored against a user are on a Confluence site level and not space/content level.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getUserProperty<T = Models.UserProperty>(parameters: Parameters.GetUserProperty, callback?: never): Promise<T>;
  async getUserProperty<T = Models.UserProperty>(
    parameters: Parameters.GetUserProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/${parameters.userId}/property/${parameters.key}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a property for a user. For more information about user properties, see [Confluence entity properties]
   * (https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these properties stored
   * against a user are on a Confluence site level and not space/content level.
   *
   * `Note:` the number of properties which could be created per app in a tenant for each user might be restricted by
   * fixed system limits. **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access
   * the Confluence site ('Can use' global permission).
   */
  async createUserProperty<T = unknown>(
    parameters: Parameters.CreateUserProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a property for a user. For more information about user properties, see [Confluence entity properties]
   * (https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these properties stored
   * against a user are on a Confluence site level and not space/content level.
   *
   * `Note:` the number of properties which could be created per app in a tenant for each user might be restricted by
   * fixed system limits. **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access
   * the Confluence site ('Can use' global permission).
   */
  async createUserProperty<T = unknown>(parameters: Parameters.CreateUserProperty, callback?: never): Promise<T>;
  async createUserProperty<T = unknown>(
    parameters: Parameters.CreateUserProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/${parameters.userId}/property/${parameters.key}`,
      method: 'POST',
      data: {
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a property for the given user. Note, you cannot update the key of a user property, only the value. For more
   * information about user properties, see [Confluence entity
   * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these
   * properties stored against a user are on a Confluence site level and not space/content level.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async updateUserProperty<T = void>(parameters: Parameters.UpdateUserProperty, callback: Callback<T>): Promise<void>;
  /**
   * Updates a property for the given user. Note, you cannot update the key of a user property, only the value. For more
   * information about user properties, see [Confluence entity
   * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these
   * properties stored against a user are on a Confluence site level and not space/content level.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async updateUserProperty<T = void>(parameters: Parameters.UpdateUserProperty, callback?: never): Promise<T>;
  async updateUserProperty<T = void>(
    parameters: Parameters.UpdateUserProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/${parameters.userId}/property/${parameters.key}`,
      method: 'PUT',
      data: {
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a property for the given user. For more information about user properties, see [Confluence entity
   * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these
   * properties stored against a user are on a Confluence site level and not space/content level.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async deleteUserProperty<T = void>(parameters: Parameters.DeleteUserProperty, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a property for the given user. For more information about user properties, see [Confluence entity
   * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these
   * properties stored against a user are on a Confluence site level and not space/content level.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async deleteUserProperty<T = void>(parameters: Parameters.DeleteUserProperty, callback?: never): Promise<T>;
  async deleteUserProperty<T = void>(
    parameters: Parameters.DeleteUserProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/${parameters.userId}/property/${parameters.key}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /** @deprecated Get the total number of distinct viewers a piece of content has. */
  async getViewers<T = Models.GetViewers>(parameters: Parameters.GetViewers, callback: Callback<T>): Promise<void>;
  /** @deprecated Get the total number of distinct viewers a piece of content has. */
  async getViewers<T = Models.GetViewers>(parameters: Parameters.GetViewers, callback?: never): Promise<T>;
  async getViewers<T = Models.GetViewers>(
    parameters: Parameters.GetViewers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/analytics/content/${parameters.contentId}/viewers`,
      method: 'GET',
      params: {
        fromDate: parameters.fromDate,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
