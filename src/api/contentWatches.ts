import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ContentWatches {
  constructor(private client: Client) {}

  /**
   * Returns the watches for a page. A user that watches a page will receive receive notifications when the page is
   * updated.
   *
   * If you want to manage watches for a page, use the following `user` methods:
   *
   * - [Get content watch status for user](#api-user-watch-content-contentId-get)
   * - [Add content watch](#api-user-watch-content-contentId-post)
   * - [Remove content watch](#api-user-watch-content-contentId-delete)
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getWatchesForPage<T = Models.WatchArray>(
    parameters: Parameters.GetWatchesForPage,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the watches for a page. A user that watches a page will receive receive notifications when the page is
   * updated.
   *
   * If you want to manage watches for a page, use the following `user` methods:
   *
   * - [Get content watch status for user](#api-user-watch-content-contentId-get)
   * - [Add content watch](#api-user-watch-content-contentId-post)
   * - [Remove content watch](#api-user-watch-content-contentId-delete)
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getWatchesForPage<T = Models.WatchArray>(
    parameters: Parameters.GetWatchesForPage,
    callback?: never,
  ): Promise<T>;
  async getWatchesForPage<T = Models.WatchArray>(
    parameters: Parameters.GetWatchesForPage,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/notification/child-created`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all space watches for the space that the content is in. A user that watches a space will receive receive
   * notifications when any content in the space is updated.
   *
   * If you want to manage watches for a space, use the following `user` methods:
   *
   * - [Get space watch status for user](#api-user-watch-space-spaceKey-get)
   * - [Add space watch](#api-user-watch-space-spaceKey-post)
   * - [Remove space watch](#api-user-watch-space-spaceKey-delete)
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getWatchesForSpace<T = Models.SpaceWatchArray>(
    parameters: Parameters.GetWatchesForSpace,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all space watches for the space that the content is in. A user that watches a space will receive receive
   * notifications when any content in the space is updated.
   *
   * If you want to manage watches for a space, use the following `user` methods:
   *
   * - [Get space watch status for user](#api-user-watch-space-spaceKey-get)
   * - [Add space watch](#api-user-watch-space-spaceKey-post)
   * - [Remove space watch](#api-user-watch-space-spaceKey-delete)
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getWatchesForSpace<T = Models.SpaceWatchArray>(
    parameters: Parameters.GetWatchesForSpace,
    callback?: never,
  ): Promise<T>;
  async getWatchesForSpace<T = Models.SpaceWatchArray>(
    parameters: Parameters.GetWatchesForSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/notification/created`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a list of watchers of a space */
  async getWatchersForSpace<T = Models.SpaceWatchArray>(
    parameters: Parameters.GetWatchersForSpace,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns a list of watchers of a space */
  async getWatchersForSpace<T = Models.SpaceWatchArray>(
    parameters: Parameters.GetWatchersForSpace,
    callback?: never,
  ): Promise<T>;
  async getWatchersForSpace<T = Models.SpaceWatchArray>(
    parameters: Parameters.GetWatchersForSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/watch`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns whether a user is watching a piece of content. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async getContentWatchStatus<T = Models.UserWatch>(
    parameters: Parameters.GetContentWatchStatus,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns whether a user is watching a piece of content. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async getContentWatchStatus<T = Models.UserWatch>(
    parameters: Parameters.GetContentWatchStatus,
    callback?: never,
  ): Promise<T>;
  async getContentWatchStatus<T = Models.UserWatch>(
    parameters: Parameters.GetContentWatchStatus,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/content/${parameters.contentId}`,
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a user as a watcher to a piece of content. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * Note, you must add the `X-Atlassian-Token: no-check` header when making a request, as this operation has XSRF
   * protection.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async addContentWatcher<T = void>(parameters: Parameters.AddContentWatcher, callback: Callback<T>): Promise<void>;
  /**
   * Adds a user as a watcher to a piece of content. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * Note, you must add the `X-Atlassian-Token: no-check` header when making a request, as this operation has XSRF
   * protection.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async addContentWatcher<T = void>(parameters: Parameters.AddContentWatcher, callback?: never): Promise<T>;
  async addContentWatcher<T = void>(
    parameters: Parameters.AddContentWatcher,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/content/${parameters.contentId}`,
      method: 'POST',
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a user as a watcher from a piece of content. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async removeContentWatcher<T = void>(
    parameters: Parameters.RemoveContentWatcher,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes a user as a watcher from a piece of content. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async removeContentWatcher<T = void>(parameters: Parameters.RemoveContentWatcher, callback?: never): Promise<T>;
  async removeContentWatcher<T = void>(
    parameters: Parameters.RemoveContentWatcher,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/content/${parameters.contentId}`,
      method: 'DELETE',
      headers: {
        'X-Atlassian-Token': parameters['X-Atlassian-Token'],
      },
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns whether a user is watching a label. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async isWatchingLabel<T = Models.UserWatch>(
    parameters: Parameters.IsWatchingLabel,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns whether a user is watching a label. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async isWatchingLabel<T = Models.UserWatch>(parameters: Parameters.IsWatchingLabel, callback?: never): Promise<T>;
  async isWatchingLabel<T = Models.UserWatch>(
    parameters: Parameters.IsWatchingLabel,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/label/${parameters.labelName}`,
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a user as a watcher to a label. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * Note, you must add the `X-Atlassian-Token: no-check` header when making a request, as this operation has XSRF
   * protection.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async addLabelWatcher<T = void>(parameters: Parameters.AddLabelWatcher, callback: Callback<T>): Promise<void>;
  /**
   * Adds a user as a watcher to a label. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * Note, you must add the `X-Atlassian-Token: no-check` header when making a request, as this operation has XSRF
   * protection.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async addLabelWatcher<T = void>(parameters: Parameters.AddLabelWatcher, callback?: never): Promise<T>;
  async addLabelWatcher<T = void>(parameters: Parameters.AddLabelWatcher, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/label/${parameters.labelName}`,
      method: 'POST',
      headers: {
        'X-Atlassian-Token': parameters['X-Atlassian-Token'],
      },
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a user as a watcher from a label. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async removeLabelWatcher<T = void>(parameters: Parameters.RemoveLabelWatcher, callback: Callback<T>): Promise<void>;
  /**
   * Removes a user as a watcher from a label. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async removeLabelWatcher<T = void>(parameters: Parameters.RemoveLabelWatcher, callback?: never): Promise<T>;
  async removeLabelWatcher<T = void>(
    parameters: Parameters.RemoveLabelWatcher,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/label/${parameters.labelName}`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns whether a user is watching a space. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async isWatchingSpace<T = Models.UserWatch>(
    parameters: Parameters.IsWatchingSpace,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns whether a user is watching a space. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async isWatchingSpace<T = Models.UserWatch>(parameters: Parameters.IsWatchingSpace, callback?: never): Promise<T>;
  async isWatchingSpace<T = Models.UserWatch>(
    parameters: Parameters.IsWatchingSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/space/${parameters.spaceKey}`,
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a user as a watcher to a space. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * Note, you must add the `X-Atlassian-Token: no-check` header when making a request, as this operation has XSRF
   * protection.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async addSpaceWatcher<T = void>(parameters: Parameters.AddSpaceWatcher, callback: Callback<T>): Promise<void>;
  /**
   * Adds a user as a watcher to a space. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * Note, you must add the `X-Atlassian-Token: no-check` header when making a request, as this operation has XSRF
   * protection.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async addSpaceWatcher<T = void>(parameters: Parameters.AddSpaceWatcher, callback?: never): Promise<T>;
  async addSpaceWatcher<T = void>(parameters: Parameters.AddSpaceWatcher, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/space/${parameters.spaceKey}`,
      method: 'POST',
      headers: {
        'X-Atlassian-Token': parameters['X-Atlassian-Token'],
      },
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a user as a watcher from a space. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback: Callback<T>): Promise<void>;
  /**
   * Removes a user as a watcher from a space. Choose the user by doing one of the following:
   *
   * - Specify a user via a query parameter: Use the `accountId` to identify the user.
   * - Do not specify a user: The currently logged-in user will be used.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
   * if specifying a user, otherwise permission to access the Confluence site ('Can use' global permission).
   */
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback?: never): Promise<T>;
  async removeSpaceWatch<T = void>(parameters: Parameters.RemoveSpaceWatch, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/user/watch/space/${parameters.spaceKey}`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
