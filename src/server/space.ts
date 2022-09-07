import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { Pagination } from '../pagination';
import { RequestConfig } from '../requestConfig';

export class Space {
  constructor(private client: Client) {}

  /** Returns information about a number of spaces. */
  async getSpaces<T = Pagination<Models.Space>>(
    parameters: Parameters.GetSpaces | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns information about a number of spaces. */
  async getSpaces<T = Pagination<Models.Space>>(parameters?: Parameters.GetSpaces, callback?: never): Promise<T>;
  async getSpaces<T = Pagination<Models.Space>>(
    parameters?: Parameters.GetSpaces,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/space',
      method: 'GET',
      params: {
        spaceKey: parameters?.spaceKey,
        type: parameters?.type,
        status: parameters?.status,
        label: parameters?.label,
        favourite: parameters?.favourite,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new Space.
   *
   * The incoming Space does not include an id, but must include a Key and Name, and should include a Description.
   */
  async createSpace<T = Models.Space>(parameters: Parameters.CreateSpace, callback: Callback<T>): Promise<void>;
  /**
   * Creates a new Space.
   *
   * The incoming Space does not include an id, but must include a Key and Name, and should include a Description.
   */
  async createSpace<T = Models.Space>(parameters: Parameters.CreateSpace, callback?: never): Promise<T>;
  async createSpace<T = Models.Space>(parameters: Parameters.CreateSpace, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/space',
      method: 'POST',
      data: {
        key: parameters.key,
        name: parameters.name,
        description: parameters.description,
        permissions: parameters.permissions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new private Space, viewable only by its creator.
   *
   * The incoming Space does not include an id, but must include a Key and Name, and should include a Description.
   */
  async createPrivateSpace<T = Models.Space>(
    parameters: Parameters.CreatePrivateSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a new private Space, viewable only by its creator.
   *
   * The incoming Space does not include an id, but must include a Key and Name, and should include a Description.
   */
  async createPrivateSpace<T = Models.Space>(parameters: Parameters.CreatePrivateSpace, callback?: never): Promise<T>;
  async createPrivateSpace<T = Models.Space>(
    parameters: Parameters.CreatePrivateSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/space/_private',
      method: 'POST',
      data: {
        key: parameters.key,
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns information about a space. */
  async getSpace<T = Models.Space>(parameters: Parameters.GetSpace, callback: Callback<T>): Promise<void>;
  /** Returns information about a space. */
  async getSpace<T = Models.Space>(parameters: Parameters.GetSpace, callback?: never): Promise<T>;
  async getSpace<T = Models.Space>(parameters: Parameters.GetSpace, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Updates a Space. Currently only the Space name, description and homepage can be updated. */
  async updateSpace<T = Models.Space>(parameters: Parameters.UpdateSpace, callback: Callback<T>): Promise<void>;
  /** Updates a Space. Currently only the Space name, description and homepage can be updated. */
  async updateSpace<T = Models.Space>(parameters: Parameters.UpdateSpace, callback?: never): Promise<T>;
  async updateSpace<T = Models.Space>(parameters: Parameters.UpdateSpace, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        homepage: parameters.homepage,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a Space.
   *
   * The space is deleted in a long running task, so the space cannot be considered deleted when this resource returns.
   * Clients can follow the status link in the response and poll it until the task completes. Responses
   */
  async deleteSpace<T = Models.DeletedSpace>(parameters: Parameters.DeleteSpace, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a Space.
   *
   * The space is deleted in a long running task, so the space cannot be considered deleted when this resource returns.
   * Clients can follow the status link in the response and poll it until the task completes. Responses
   */
  async deleteSpace<T = Models.DeletedSpace>(parameters: Parameters.DeleteSpace, callback?: never): Promise<T>;
  async deleteSpace<T = Models.DeletedSpace>(
    parameters: Parameters.DeleteSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns the content in this given space */
  async getContentForSpace<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentForSpace,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns the content in this given space */
  async getContentForSpace<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentForSpace,
    callback?: never
  ): Promise<T>;
  async getContentForSpace<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentForSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}/content`,
      method: 'GET',
      params: {
        depth: parameters.depth,
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns the content in this given space with the given type */
  async getContentByType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentByType,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns the content in this given space with the given type */
  async getContentByType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentByType,
    callback?: never
  ): Promise<T>;
  async getContentByType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentByType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}/content/${parameters.type}`,
      method: 'GET',
      params: {
        depth: parameters.depth,
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a paginated list of space properties. */
  async getSpaceProperties<T = Pagination<Models.SpaceProperty>>(
    parameters: Parameters.GetSpaceProperties,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns a paginated list of space properties. */
  async getSpaceProperties<T = Pagination<Models.SpaceProperty>>(
    parameters: Parameters.GetSpaceProperties,
    callback?: never
  ): Promise<T>;
  async getSpaceProperties<T = Pagination<Models.SpaceProperty>>(
    parameters: Parameters.GetSpaceProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}/property`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Creates a new space property. */
  async createSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpaceProperty,
    callback: Callback<T>
  ): Promise<void>;
  /** Creates a new space property. */
  async createSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpaceProperty,
    callback?: never
  ): Promise<T>;
  async createSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpaceProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}/property`,
      method: 'POST',
      data: {
        key: parameters.key,
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a paginated list of space properties. */
  async getSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.GetSpaceProperty,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns a paginated list of space properties. */
  async getSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.GetSpaceProperty,
    callback?: never
  ): Promise<T>;
  async getSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.GetSpaceProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Creates a new space property. */
  async createSpacePropertyForKey<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpacePropertyForKey,
    callback: Callback<T>
  ): Promise<void>;
  /** Creates a new space property. */
  async createSpacePropertyForKey<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpacePropertyForKey,
    callback?: never
  ): Promise<T>;
  async createSpacePropertyForKey<T = Models.SpaceProperty>(
    parameters: Parameters.CreateSpacePropertyForKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'POST',
      data: {
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a space property. The body contains the representation of the space property. Must include new version
   * number. If the given version number is 1, attempts to create a new space property, just like
   * {@link #create(String, com.atlassian.confluence.api.model.content.JsonSpaceProperty)}.
   */
  async updateSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.UpdateSpaceProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a space property. The body contains the representation of the space property. Must include new version
   * number. If the given version number is 1, attempts to create a new space property, just like
   * {@link #create(String, com.atlassian.confluence.api.model.content.JsonSpaceProperty)}.
   */
  async updateSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.UpdateSpaceProperty,
    callback?: never
  ): Promise<T>;
  async updateSpaceProperty<T = Models.SpaceProperty>(
    parameters: Parameters.UpdateSpaceProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /** Deletes a space property. */
  async deleteSpaceProperty<T = void>(parameters: Parameters.DeleteSpaceProperty, callback: Callback<T>): Promise<void>;
  /** Deletes a space property. */
  async deleteSpaceProperty<T = void>(parameters: Parameters.DeleteSpaceProperty, callback?: never): Promise<T>;
  async deleteSpaceProperty<T = void>(
    parameters: Parameters.DeleteSpaceProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
