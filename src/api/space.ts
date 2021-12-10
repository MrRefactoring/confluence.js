import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Space {
  constructor(private client: Client) {}

  /**
   * Returns all spaces. The returned spaces are ordered alphabetically in ascending order by space key.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Note, the returned list will only contain spaces that the current user has
   * permission to view.
   */
  async getSpaces<T = Models.SpaceArray>(
    parameters: Parameters.GetSpaces | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all spaces. The returned spaces are ordered alphabetically in ascending order by space key.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Note, the returned list will only contain spaces that the current user has
   * permission to view.
   */
  async getSpaces<T = Models.SpaceArray>(parameters?: Parameters.GetSpaces, callback?: never): Promise<T>;
  async getSpaces<T = Models.SpaceArray>(parameters?: Parameters.GetSpaces, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/space',
      method: 'GET',
      params: {
        spaceKey: parameters?.spaceKey,
        spaceId: parameters?.spaceId,
        type: parameters?.type,
        status: parameters?.status,
        label: parameters?.label,
        favourite: parameters?.favourite,
        favouriteUserKey: parameters?.favouriteUserKey,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new space. Note, currently you cannot set space labels when creating a space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Create Space(s)' global permission.
   */
  async createSpace<T = Models.Space>(
    parameters: Parameters.CreateSpace | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a new space. Note, currently you cannot set space labels when creating a space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Create Space(s)' global permission.
   */
  async createSpace<T = Models.Space>(parameters?: Parameters.CreateSpace, callback?: never): Promise<T>;
  async createSpace<T = Models.Space>(parameters?: Parameters.CreateSpace, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/space',
      method: 'POST',
      data: {
        key: parameters?.key,
        name: parameters?.name,
        description: parameters?.description,
        permissions: parameters?.permissions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new space that is only visible to the creator. This method is the same as the [Create
   * space](#api-space-post) method with permissions set to the current user only. Note, currently you cannot set space
   * labels when creating a space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Create Space(s)' global permission.
   */
  async createPrivateSpace<T = Models.Space>(
    parameters: Parameters.CreatePrivateSpace | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a new space that is only visible to the creator. This method is the same as the [Create
   * space](#api-space-post) method with permissions set to the current user only. Note, currently you cannot set space
   * labels when creating a space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Create Space(s)' global permission.
   */
  async createPrivateSpace<T = Models.Space>(parameters?: Parameters.CreatePrivateSpace, callback?: never): Promise<T>;
  async createPrivateSpace<T = Models.Space>(
    parameters?: Parameters.CreatePrivateSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/space/_private',
      method: 'POST',
      data: {
        key: parameters?.key,
        name: parameters?.name,
        description: parameters?.description,
        permissions: parameters?.permissions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a space. This includes information like the name, description, and permissions, but not the content in the space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space.
   */
  async getSpace<T = Models.Space>(parameters: Parameters.GetSpace, callback: Callback<T>): Promise<void>;
  /**
   * Returns a space. This includes information like the name, description, and permissions, but not the content in the space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space.
   */
  async getSpace<T = Models.Space>(parameters: Parameters.GetSpace, callback?: never): Promise<T>;
  async getSpace<T = Models.Space>(parameters: Parameters.GetSpace, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the name, description, or homepage of a space.
   *
   * - For security reasons, permissions cannot be updated via the API and must be changed via the user interface instead.
   * - Currently you cannot set space labels when updating a space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async updateSpace<T = Models.Space>(parameters: Parameters.UpdateSpace, callback: Callback<T>): Promise<void>;
  /**
   * Updates the name, description, or homepage of a space.
   *
   * - For security reasons, permissions cannot be updated via the API and must be changed via the user interface instead.
   * - Currently you cannot set space labels when updating a space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async updateSpace<T = Models.Space>(parameters: Parameters.UpdateSpace, callback?: never): Promise<T>;
  async updateSpace<T = Models.Space>(parameters: Parameters.UpdateSpace, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        homepage: parameters.homepage,
        type: parameters.type,
        status: parameters.status,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a space. Note, the space will be deleted in a long running task. Therefore, the space may not be deleted
   * yet when this method has returned. Clients should poll the status link that is returned in the response until the
   * task completes.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async deleteSpace<T = Models.DeletedSpace>(parameters: Parameters.DeleteSpace, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a space. Note, the space will be deleted in a long running task. Therefore, the space may not be deleted
   * yet when this method has returned. Clients should poll the status link that is returned in the response until the
   * task completes.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async deleteSpace<T = Models.DeletedSpace>(parameters: Parameters.DeleteSpace, callback?: never): Promise<T>;
  async deleteSpace<T = Models.DeletedSpace>(
    parameters: Parameters.DeleteSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all content in a space. The returned content is grouped by type (pages then blogposts), then ordered by
   * content ID in ascending order.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space. Note, the
   * returned list will only contain content that the current user has permission to view.
   */
  async getContentForSpace<T = Models.ContentArray>(
    parameters: Parameters.GetContentForSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all content in a space. The returned content is grouped by type (pages then blogposts), then ordered by
   * content ID in ascending order.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space. Note, the
   * returned list will only contain content that the current user has permission to view.
   */
  async getContentForSpace<T = Models.ContentArray>(
    parameters: Parameters.GetContentForSpace,
    callback?: never
  ): Promise<T>;
  async getContentForSpace<T = Models.ContentArray>(
    parameters: Parameters.GetContentForSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/content`,
      method: 'GET',
      params: {
        depth: parameters.depth,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all content of a given type, in a space. The returned content is ordered by content ID in ascending order.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space. Note, the
   * returned list will only contain content that the current user has permission to view.
   */
  async getContentByTypeForSpace<T = Models.ContentArray>(
    parameters: Parameters.GetContentByTypeForSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all content of a given type, in a space. The returned content is ordered by content ID in ascending order.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space. Note, the
   * returned list will only contain content that the current user has permission to view.
   */
  async getContentByTypeForSpace<T = Models.ContentArray>(
    parameters: Parameters.GetContentByTypeForSpace,
    callback?: never
  ): Promise<T>;
  async getContentByTypeForSpace<T = Models.ContentArray>(
    parameters: Parameters.GetContentByTypeForSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/content/${parameters.type}`,
      method: 'GET',
      params: {
        depth: parameters.depth,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
