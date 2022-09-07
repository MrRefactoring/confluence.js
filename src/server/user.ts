import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { Pagination } from '../pagination';
import { RequestConfig } from '../requestConfig';

export class User {
  constructor(private client: Client) {}

  /** Get information about a user identified by either user key or username. */
  async getUser<T = Models.User>(parameters: Parameters.GetUser | undefined, callback: Callback<T>): Promise<void>;
  /** Get information about a user identified by either user key or username. */
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: never): Promise<T>;
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/user',
      method: 'GET',
      params: {
        key: parameters?.key,
        username: parameters?.username,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get information about the how anonymous is represented in confluence */
  async getAnonymousUser<T = Models.UserAnonymous>(callback: Callback<T>): Promise<void>;
  /** Get information about the how anonymous is represented in confluence */
  async getAnonymousUser<T = Models.UserAnonymous>(callback?: never): Promise<T>;
  async getAnonymousUser<T = Models.UserAnonymous>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/user/anonymous',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get information about the current logged-in user. */
  async getCurrentUser<T = Models.User>(
    parameters: Parameters.GetCurrentUser | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Get information about the current logged-in user. */
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: never): Promise<T>;
  async getCurrentUser<T = Models.User>(
    parameters?: Parameters.GetCurrentUser,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/user/current',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get a paginated collection of groups that the given user is a member of */
  async getGroupMembershipsForUser<T = Pagination<Models.Group>>(
    parameters: Parameters.GetGroups | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Get a paginated collection of groups that the given user is a member of */
  async getGroupMembershipsForUser<T = Pagination<Models.Group>>(
    parameters?: Parameters.GetGroups,
    callback?: never
  ): Promise<T>;
  async getGroupMembershipsForUser<T = Pagination<Models.Group>>(
    parameters?: Parameters.GetGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/user/memberof',
      method: 'GET',
      params: {
        key: parameters?.key,
        username: parameters?.username,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Get information about whether a user is watching a specified content.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async getContentWatchStatus<T = Models.UserWatch>(
    parameters: Parameters.GetContentWatchStatus,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Get information about whether a user is watching a specified content.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async getContentWatchStatus<T = Models.UserWatch>(
    parameters: Parameters.GetContentWatchStatus,
    callback?: never
  ): Promise<T>;
  async getContentWatchStatus<T = Models.UserWatch>(
    parameters: Parameters.GetContentWatchStatus,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/user/watch/content/${parameters.contentId}`,
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Create a new watcher for the given user and content id.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async addContentWatcher<T = void>(parameters: Parameters.AddContentWatcher, callback: Callback<T>): Promise<void>;
  /**
   * Create a new watcher for the given user and content id.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async addContentWatcher<T = void>(parameters: Parameters.AddContentWatcher, callback?: never): Promise<T>;
  async addContentWatcher<T = void>(
    parameters: Parameters.AddContentWatcher,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/user/watch/content/${parameters.contentId}`,
      method: 'POST',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete an existing watcher for the given user and content id.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async removeContentWatcher<T = void>(
    parameters: Parameters.RemoveContentWatcher,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Delete an existing watcher for the given user and content id.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async removeContentWatcher<T = void>(parameters: Parameters.RemoveContentWatcher, callback?: never): Promise<T>;
  async removeContentWatcher<T = void>(
    parameters: Parameters.RemoveContentWatcher,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/user/watch/content/${parameters.contentId}`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Get information about whether a user is watching a specified space.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async isWatchingSpace<T = Models.UserWatch>(
    parameters: Parameters.IsWatchingSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Get information about whether a user is watching a specified space.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async isWatchingSpace<T = Models.UserWatch>(parameters: Parameters.IsWatchingSpace, callback?: never): Promise<T>;
  async isWatchingSpace<T = Models.UserWatch>(
    parameters: Parameters.IsWatchingSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/user/watch/space/${parameters.spaceKey}`,
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Create a new watcher for the given user and space key.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async addSpaceWatch<T = void>(parameters: Parameters.AddSpaceWatch, callback: Callback<T>): Promise<void>;
  /**
   * Create a new watcher for the given user and space key.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async addSpaceWatch<T = void>(parameters: Parameters.AddSpaceWatch, callback?: never): Promise<T>;
  async addSpaceWatch<T = void>(parameters: Parameters.AddSpaceWatch, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/user/watch/space/${parameters.spaceKey}`,
      method: 'POST',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete an existing watcher for the given user and space key.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback: Callback<T>): Promise<void>;
  /**
   * Delete an existing watcher for the given user and space key.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   */
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback?: never): Promise<T>;
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/user/watch/space/${parameters.spaceKey}`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
