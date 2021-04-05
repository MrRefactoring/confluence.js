import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class SpaceProperties {
  constructor(private client: Client) { }
  /**
     * Returns all properties for the given space. Space properties are a key-value storage associated with a space.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**: ‘View’ permission for the space. */
  async getSpaceProperties<T = Models.SpacePropertyArray>(parameters: Parameters.GetSpaceProperties, callback: Callback<T>): Promise<void>;
  /**
     * Returns all properties for the given space. Space properties are a key-value storage associated with a space.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**: ‘View’ permission for the space. */
  async getSpaceProperties<T = Models.SpacePropertyArray>(parameters: Parameters.GetSpaceProperties, callback?: never): Promise<T>;
  async getSpaceProperties<T = Models.SpacePropertyArray>(parameters: Parameters.GetSpaceProperties, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/property`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getSpaceProperties' });
  }
  /**
     * Creates a new space property.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**:
     * ‘Admin’ permission for the space. */
  async createSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.CreateSpaceProperty, callback: Callback<T>): Promise<void>;
  /**
     * Creates a new space property.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**:
     * ‘Admin’ permission for the space. */
  async createSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.CreateSpaceProperty, callback?: never): Promise<T>;
  async createSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.CreateSpaceProperty, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/property`,
      method: 'POST',
      data: {
        key: parameters.key,
        value: parameters.value,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createSpaceProperty' });
  }
  /**
     * Returns a space property.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**: ‘View’ permission for the space. */
  async getSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.GetSpaceProperty, callback: Callback<T>): Promise<void>;
  /**
     * Returns a space property.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**: ‘View’ permission for the space. */
  async getSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.GetSpaceProperty, callback?: never): Promise<T>;
  async getSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.GetSpaceProperty, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getSpaceProperty' });
  }
  /**
     * Creates a new space property. This is the same as `POST
     * /api/space/{spaceKey}/property` but the key for the property is passed as a
     * path parameter, rather than in the request body.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**:
     * ‘Admin’ permission for the space. */
  async createSpacePropertyForKey<T = Models.SpaceProperty>(parameters: Parameters.CreateSpacePropertyForKey, callback: Callback<T>): Promise<void>;
  /**
     * Creates a new space property. This is the same as `POST
     * /api/space/{spaceKey}/property` but the key for the property is passed as a
     * path parameter, rather than in the request body.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**:
     * ‘Admin’ permission for the space. */
  async createSpacePropertyForKey<T = Models.SpaceProperty>(parameters: Parameters.CreateSpacePropertyForKey, callback?: never): Promise<T>;
  async createSpacePropertyForKey<T = Models.SpaceProperty>(parameters: Parameters.CreateSpacePropertyForKey, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'POST',
      data: {
        value: parameters.value,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createSpacePropertyForKey' });
  }
  /**
     * Updates a space property. Note, you cannot update the key of a space
     * property, only the value.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**:
     * ‘Admin’ permission for the space. */
  async updateSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.UpdateSpaceProperty, callback: Callback<T>): Promise<void>;
  /**
     * Updates a space property. Note, you cannot update the key of a space
     * property, only the value.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**:
     * ‘Admin’ permission for the space. */
  async updateSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.UpdateSpaceProperty, callback?: never): Promise<T>;
  async updateSpaceProperty<T = Models.SpaceProperty>(parameters: Parameters.UpdateSpaceProperty, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'PUT',
      data: {
        value: parameters.value,
        version: parameters.version,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateSpaceProperty' });
  }
  /**
     * Deletes a space property.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**:
     * ‘Admin’ permission for the space. */
  async deleteSpaceProperty<T = void>(parameters: Parameters.DeleteSpaceProperty, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a space property.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**:
     * ‘Admin’ permission for the space. */
  async deleteSpaceProperty<T = void>(parameters: Parameters.DeleteSpaceProperty, callback?: never): Promise<T>;
  async deleteSpaceProperty<T = void>(parameters: Parameters.DeleteSpaceProperty, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'DELETE',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'deleteSpaceProperty' });
  }
}
