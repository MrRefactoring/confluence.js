import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';
import { Pagination } from '../pagination';

export class User {
  constructor(private client: Client) {}

  /**
   * Get information about a user identified by either user key or username.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user?username=jblogs
   *   - http://example.com/rest/api/user?key=402880824ff933a4014ff9345d7c0002
   */
  async getUser<T = Models.User>(parameters: Parameters.GetUser | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Get information about a user identified by either user key or username.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user?username=jblogs
   *   - http://example.com/rest/api/user?key=402880824ff933a4014ff9345d7c0002
   */
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: never): Promise<T>;
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/user',
      method: 'GET',
      params: {
        key: parameters?.key,
        username: parameters?.username,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getUser' });
  }

  /**
   * Get information about the how anonymous is represented in confluence
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user/anonymous
   */
  async getAnonymousUser<T = Models.UserAnonymous>(callback: Callback<T>): Promise<void>;
  /**
   * Get information about the how anonymous is represented in confluence
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user/anonymous
   */
  async getAnonymousUser<T = Models.UserAnonymous>(callback?: never): Promise<T>;
  async getAnonymousUser<T = Models.UserAnonymous>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/user/anonymous',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getAnonymousUser' });
  }

  /**
   * Get information about the current logged in user.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user/current
   */
  async getCurrentUser<T = Models.User>(
    parameters: Parameters.GetCurrentUser | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Get information about the current logged in user.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user/current
   */
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: never): Promise<T>;
  async getCurrentUser<T = Models.User>(
    parameters?: Parameters.GetCurrentUser,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/user/current',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getCurrentUser' });
  }

  /**
   * Get a paginated collection of groups that the given user is a member of
   *
   * @example
   *   Example request URI(s):
   *
   *   http://example.com/rest/api/user/memberof?username=jblogs
   *   http://example.com/rest/api/user/memberof?key=402880824ff933a4014ff9345d7c0002
   */
  async getGroupMembershipsForUser<T = Pagination<Models.Group>>(
    parameters: Parameters.GetGroups | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Get a paginated collection of groups that the given user is a member of
   *
   * @example
   *   Example request URI(s):
   *
   *   http://example.com/rest/api/user/memberof?username=jblogs
   *   http://example.com/rest/api/user/memberof?key=402880824ff933a4014ff9345d7c0002
   */
  async getGroupMembershipsForUser<T = Pagination<Models.Group>>(
    parameters?: Parameters.GetGroups,
    callback?: never
  ): Promise<T>;
  async getGroupMembershipsForUser<T = Pagination<Models.Group>>(
    parameters?: Parameters.GetGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/user/memberof',
      method: 'GET',
      params: {
        key: parameters?.key,
        username: parameters?.username,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getGroupMembershipsForUser' });
  }

  /**
   * Get information about whether a user is watching a specified content.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user/watch/content/131213
   *   - http://example.com/rest/api/user/watch/content/131213?username=jblogs
   *   - http://example.com/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000
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
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user/watch/content/131213
   *   - http://example.com/rest/api/user/watch/content/131213?username=jblogs
   *   - http://example.com/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000
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
      url: `/rest/user/watch/content/${parameters.contentId}`,
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentWatchStatus' });
  }

  /**
   * Create a new watcher for the given user and content id.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - POST http://example.com/rest/api/user/watch/content/131213
   *   - POST http://example.com/rest/api/user/watch/content/131213?username=jblogs
   *   - POST http://example.com/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000
   */
  async addContentWatcher<T = void>(parameters: Parameters.AddContentWatcher, callback: Callback<T>): Promise<void>;
  /**
   * Create a new watcher for the given user and content id.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - POST http://example.com/rest/api/user/watch/content/131213
   *   - POST http://example.com/rest/api/user/watch/content/131213?username=jblogs
   *   - POST http://example.com/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000
   */
  async addContentWatcher<T = void>(parameters: Parameters.AddContentWatcher, callback?: never): Promise<T>;
  async addContentWatcher<T = void>(
    parameters: Parameters.AddContentWatcher,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/user/watch/content/${parameters.contentId}`,
      method: 'POST',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.addContentWatcher' });
  }

  /**
   * Delete an existing watcher for the given user and content id.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - DELETE http://example.com/rest/api/user/watch/content/131213
   *   - DELETE http://example.com/rest/api/user/watch/content/131213?username=jblogs
   *   - DELETE http://example.com/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000
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
   *
   * @example
   *   Example request URI(s):
   *
   *   - DELETE http://example.com/rest/api/user/watch/content/131213
   *   - DELETE http://example.com/rest/api/user/watch/content/131213?username=jblogs
   *   - DELETE http://example.com/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000
   */
  async removeContentWatcher<T = void>(parameters: Parameters.RemoveContentWatcher, callback?: never): Promise<T>;
  async removeContentWatcher<T = void>(
    parameters: Parameters.RemoveContentWatcher,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/user/watch/content/${parameters.contentId}`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.removeContentWatcher' });
  }

  /**
   * Get information about whether a user is watching a specified space.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user/watch/space/SPACEKEY
   *   - http://example.com/rest/api/user/watch/space/SPACEKEY?username=jblogs
   *   - http://example.com/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000
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
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/user/watch/space/SPACEKEY
   *   - http://example.com/rest/api/user/watch/space/SPACEKEY?username=jblogs
   *   - http://example.com/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000
   */
  async isWatchingSpace<T = Models.UserWatch>(parameters: Parameters.IsWatchingSpace, callback?: never): Promise<T>;
  async isWatchingSpace<T = Models.UserWatch>(
    parameters: Parameters.IsWatchingSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/user/watch/space/${parameters.spaceKey}`,
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.isWatchingSpace' });
  }

  /**
   * Create a new watcher for the given user and space key.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - POST http://example.com/rest/api/user/watch/space/SPACEKEY
   *   - POST http://example.com/rest/api/user/watch/space/SPACEKEY?username=jblogs
   *   - POST http://example.com/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000
   */
  async addSpaceWatch<T = void>(parameters: Parameters.AddSpaceWatch, callback: Callback<T>): Promise<void>;
  /**
   * Create a new watcher for the given user and space key.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - POST http://example.com/rest/api/user/watch/space/SPACEKEY
   *   - POST http://example.com/rest/api/user/watch/space/SPACEKEY?username=jblogs
   *   - POST http://example.com/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000
   */
  async addSpaceWatch<T = void>(parameters: Parameters.AddSpaceWatch, callback?: never): Promise<T>;
  async addSpaceWatch<T = void>(parameters: Parameters.AddSpaceWatch, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/user/watch/space/${parameters.spaceKey}`,
      method: 'POST',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.addSpaceWatch' });
  }

  /**
   * Delete an existing watcher for the given user and space key.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - DELETE http://example.com/rest/api/user/watch/space/SPACEKEY
   *   - DELETE http://example.com/rest/api/user/watch/space/SPACEKEY?username=jblogs
   *   - DELETE http://example.com/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000
   */
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback: Callback<T>): Promise<void>;
  /**
   * Delete an existing watcher for the given user and space key.
   *
   * User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either
   * user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs
   * to be a Confluence administrator.
   *
   * @example
   *   Example request URI(s):
   *
   *   - DELETE http://example.com/rest/api/user/watch/space/SPACEKEY
   *   - DELETE http://example.com/rest/api/user/watch/space/SPACEKEY?username=jblogs
   *   - DELETE http://example.com/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000
   */
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback?: never): Promise<T>;
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/user/watch/space/${parameters.spaceKey}`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.removeSpaceWatch' });
  }
}
