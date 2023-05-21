import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class SpaceProperties {
  constructor(private client: Client) {}

  /**
   * Returns all properties for the given space. Space properties are a key-value storage associated with a space. The
   * limit parameter specifies the maximum number of results returned in a single response. Use the `link` response
   * header to paginate through additional results.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'View' permission for the space.
   */
  async getSpaceProperties<T = Models.Pagination<Models.SpaceProperty>>(
    parameters: Parameters.GetSpaceProperties,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all properties for the given space. Space properties are a key-value storage associated with a space. The
   * limit parameter specifies the maximum number of results returned in a single response. Use the `link` response
   * header to paginate through additional results.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'View' permission for the space.
   */
  async getSpaceProperties<T = Models.Pagination<Models.SpaceProperty>>(
    parameters: Parameters.GetSpaceProperties,
    callback?: never,
  ): Promise<T>;
  async getSpaceProperties<T = Models.Pagination<Models.SpaceProperty>>(
    parameters: Parameters.GetSpaceProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.spaceId}/properties`,
      method: 'GET',
      params: {
        key: parameters.key,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new space property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'Admin' permission for the space.
   */
  async createSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpaceProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new space property.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'Admin' permission for the space.
   */
  async createSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpaceProperty,
    callback?: never,
  ): Promise<T>;
  async createSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpaceProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.spaceId}/properties`,
      method: 'POST',
      params: {
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
      data: {
        key: parameters.key,
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieve a space property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'View' permission for the space.
   */
  async getSpacePropertyById<T = Models.SpaceProperty>(
    parameters: Parameters.GetSpacePropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieve a space property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'View' permission for the space.
   */
  async getSpacePropertyById<T = Models.SpaceProperty>(
    parameters: Parameters.GetSpacePropertyById,
    callback?: never,
  ): Promise<T>;
  async getSpacePropertyById<T = Models.SpaceProperty>(
    parameters: Parameters.GetSpacePropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.spaceId}/properties/${parameters.propertyId}`,
      method: 'GET',
      params: {
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a space property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'Admin' permission for the space.
   */
  async updateSpacePropertyById<T = Models.SpaceProperty>(
    parameters: Parameters.UpdateSpacePropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update a space property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'Admin' permission for the space.
   */
  async updateSpacePropertyById<T = Models.SpaceProperty>(
    parameters: Parameters.UpdateSpacePropertyById,
    callback?: never,
  ): Promise<T>;
  async updateSpacePropertyById<T = Models.SpaceProperty>(
    parameters: Parameters.UpdateSpacePropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.spaceId}/properties/${parameters.propertyId}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
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
   * Deletes a space property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'Admin' permission for the space.
   */
  async deleteSpacePropertyById<T = void>(
    parameters: Parameters.DeleteSpacePropertyById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a space property by its id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'Admin' permission for the space.
   */
  async deleteSpacePropertyById<T = void>(parameters: Parameters.DeleteSpacePropertyById, callback?: never): Promise<T>;
  async deleteSpacePropertyById<T = void>(
    parameters: Parameters.DeleteSpacePropertyById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.spaceId}/properties/${parameters.propertyId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
