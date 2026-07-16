import { WatchArraySchema, type WatchArray } from '../models/watchArray';
import { SpaceWatchArraySchema, type SpaceWatchArray } from '../models/spaceWatchArray';
import { UserWatchSchema, type UserWatch } from '../models/userWatch';
import type { GetWatchesForPage } from '../parameters/getWatchesForPage';
import type { GetWatchesForSpace } from '../parameters/getWatchesForSpace';
import type { GetWatchersForSpace } from '../parameters/getWatchersForSpace';
import type { GetContentWatchStatus } from '../parameters/getContentWatchStatus';
import type { AddContentWatcher } from '../parameters/addContentWatcher';
import type { RemoveContentWatcher } from '../parameters/removeContentWatcher';
import type { IsWatchingLabel } from '../parameters/isWatchingLabel';
import type { AddLabelWatcher } from '../parameters/addLabelWatcher';
import type { RemoveLabelWatcher } from '../parameters/removeLabelWatcher';
import type { IsWatchingSpace } from '../parameters/isWatchingSpace';
import type { AddSpaceWatcher } from '../parameters/addSpaceWatcher';
import type { RemoveSpaceWatch } from '../parameters/removeSpaceWatch';
import type { Client, SendRequestOptions } from '#/core';

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
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getWatchesForPage(client: Client, parameters: GetWatchesForPage): Promise<WatchArray> {
  const config: SendRequestOptions<WatchArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/notification/child-created`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: WatchArraySchema,
  };

  return await client.sendRequest(config);
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
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getWatchesForSpace(client: Client, parameters: GetWatchesForSpace): Promise<SpaceWatchArray> {
  const config: SendRequestOptions<SpaceWatchArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/notification/created`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: SpaceWatchArraySchema,
  };

  return await client.sendRequest(config);
}

/** Returns a list of watchers of a space */
export async function getWatchersForSpace(client: Client, parameters: GetWatchersForSpace): Promise<SpaceWatchArray> {
  const config: SendRequestOptions<SpaceWatchArray> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/watch`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: SpaceWatchArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns whether a user is watching a piece of content. Choose the user by doing one of the following:
 *
 * - Specify a user via a query parameter: Use the `accountId` to identify the user.
 * - Do not specify a user: The currently logged-in user will be used.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
 * or 'Space Administrator' permission for the relevant space if specifying a user, otherwise permission to access the
 * Confluence site ('Can use' global permission).
 */
export async function getContentWatchStatus(client: Client, parameters: GetContentWatchStatus): Promise<UserWatch> {
  const config: SendRequestOptions<UserWatch> = {
    url: `/wiki/rest/api/user/watch/content/${parameters.contentId}`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
    schema: UserWatchSchema,
  };

  return await client.sendRequest(config);
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
 * or 'Space Administrator' permission for the relevant space if specifying a user, otherwise permission to access the
 * Confluence site ('Can use' global permission).
 */
export async function addContentWatcher(client: Client, parameters: AddContentWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/watch/content/${parameters.contentId}`,
    method: 'POST',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Removes a user as a watcher from a piece of content. Choose the user by doing one of the following:
 *
 * - Specify a user via a query parameter: Use the `accountId` to identify the user.
 * - Do not specify a user: The currently logged-in user will be used.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
 * or 'Space Administrator' permission for the relevant space if specifying a user, otherwise permission to access the
 * Confluence site ('Can use' global permission).
 */
export async function removeContentWatcher(client: Client, parameters: RemoveContentWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/watch/content/${parameters.contentId}`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': parameters['X-Atlassian-Token'],
    },
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
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
export async function isWatchingLabel(client: Client, parameters: IsWatchingLabel): Promise<UserWatch> {
  const config: SendRequestOptions<UserWatch> = {
    url: `/wiki/rest/api/user/watch/label/${parameters.labelName}`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
    schema: UserWatchSchema,
  };

  return await client.sendRequest(config);
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
export async function addLabelWatcher(client: Client, parameters: AddLabelWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/watch/label/${parameters.labelName}`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': parameters['X-Atlassian-Token'],
    },
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
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
export async function removeLabelWatcher(client: Client, parameters: RemoveLabelWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/watch/label/${parameters.labelName}`,
    method: 'DELETE',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns whether a user is watching a space. Choose the user by doing one of the following:
 *
 * - Specify a user via a query parameter: Use the `accountId` to identify the user.
 * - Do not specify a user: The currently logged-in user will be used.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
 * or 'Space Administrator' permission for the relevant space if specifying a user, otherwise permission to access the
 * Confluence site ('Can use' global permission).
 */
export async function isWatchingSpace(client: Client, parameters: IsWatchingSpace): Promise<UserWatch> {
  const config: SendRequestOptions<UserWatch> = {
    url: `/wiki/rest/api/user/watch/space/${parameters.spaceKey}`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
    schema: UserWatchSchema,
  };

  return await client.sendRequest(config);
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
 * or 'Space Administrator' permission for the relevant space if specifying a user, otherwise permission to access the
 * Confluence site ('Can use' global permission).
 */
export async function addSpaceWatcher(client: Client, parameters: AddSpaceWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/watch/space/${parameters.spaceKey}`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': parameters['X-Atlassian-Token'],
    },
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Removes a user as a watcher from a space. Choose the user by doing one of the following:
 *
 * - Specify a user via a query parameter: Use the `accountId` to identify the user.
 * - Do not specify a user: The currently logged-in user will be used.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission
 * or 'Space Administrator' permission for the relevant space if specifying a user, otherwise permission to access the
 * Confluence site ('Can use' global permission).
 */
export async function removeSpaceWatch(client: Client, parameters: RemoveSpaceWatch): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/watch/space/${parameters.spaceKey}`,
    method: 'DELETE',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}
