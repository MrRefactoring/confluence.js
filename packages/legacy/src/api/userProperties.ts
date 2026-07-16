import type * as Models from './models/index.js';
import type * as Parameters from './parameters/index.js';
import type { Client } from '../clients/index.js';
import type { Callback } from '../callback.js';
import type { RequestConfig } from '../requestConfig.js';

export class UserProperties {
  constructor(private client: Client) {}

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
    callback: Callback<T>,
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
    callback?: never,
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
    callback: Callback<T>,
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
    callback: Callback<T>,
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
}
