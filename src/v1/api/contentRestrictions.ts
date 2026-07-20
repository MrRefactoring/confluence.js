import { ContentRestrictionArraySchema, type ContentRestrictionArray } from '../models/contentRestrictionArray';
import { ContentRestrictionSchema, type ContentRestriction } from '../models/contentRestriction';
import type { GetRestrictions } from '../parameters/getRestrictions';
import type { AddRestrictions } from '../parameters/addRestrictions';
import type { UpdateRestrictions } from '../parameters/updateRestrictions';
import type { DeleteRestrictions } from '../parameters/deleteRestrictions';
import type { GetRestrictionsByOperation } from '../parameters/getRestrictionsByOperation';
import type { GetRestrictionsForOperation } from '../parameters/getRestrictionsForOperation';
import type { GetIndividualGroupRestrictionStatusByGroupId } from '../parameters/getIndividualGroupRestrictionStatusByGroupId';
import type { AddGroupToContentRestrictionByGroupId } from '../parameters/addGroupToContentRestrictionByGroupId';
import type { RemoveGroupFromContentRestriction } from '../parameters/removeGroupFromContentRestriction';
import type { GetContentRestrictionStatusForUser } from '../parameters/getContentRestrictionStatusForUser';
import type { AddUserToContentRestriction } from '../parameters/addUserToContentRestriction';
import type { RemoveUserFromContentRestriction } from '../parameters/removeUserFromContentRestriction';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the restrictions on a piece of content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
 */
export async function getRestrictions(client: Client, parameters: GetRestrictions): Promise<ContentRestrictionArray> {
  const config: SendRequestOptions<ContentRestrictionArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: ContentRestrictionArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds restrictions to a piece of content. Note, this does not change any existing restrictions on the content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function addRestrictions(client: Client, parameters: AddRestrictions): Promise<ContentRestrictionArray> {
  const config: SendRequestOptions<ContentRestrictionArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      expand: parameters.expand,
    },
    body: parameters.body,
    schema: ContentRestrictionArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates restrictions for a piece of content. This removes the existing restrictions and replaces them with the
 * restrictions in the request.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function updateRestrictions(
  client: Client,
  parameters: UpdateRestrictions,
): Promise<ContentRestrictionArray> {
  const config: SendRequestOptions<ContentRestrictionArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      expand: parameters.expand,
    },
    body: parameters.body,
    schema: ContentRestrictionArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Removes all restrictions (read and update) on a piece of content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function deleteRestrictions(
  client: Client,
  parameters: DeleteRestrictions,
): Promise<ContentRestrictionArray> {
  const config: SendRequestOptions<ContentRestrictionArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      expand: parameters.expand,
    },
    schema: ContentRestrictionArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns restrictions on a piece of content by operation. This method is similar to [Get
 * restrictions](#api-content-id-restriction-get) except that the operations are properties of the return object, rather
 * than items in a results array.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
 */
export async function getRestrictionsByOperation(
  client: Client,
  parameters: GetRestrictionsByOperation,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction/byOperation`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the restictions on a piece of content for a given operation (read or update).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
 */
export async function getRestrictionsForOperation(
  client: Client,
  parameters: GetRestrictionsForOperation,
): Promise<ContentRestriction> {
  const config: SendRequestOptions<ContentRestriction> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: ContentRestrictionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns whether the specified content restriction applies to a group. For example, if a page with `id=123` has a
 * `read` restriction for the `123456` group id, the following request will return `true`:
 *
 * `/wiki/rest/api/content/123/restriction/byOperation/read/byGroupId/123456`
 *
 * Note that a response of `true` does not guarantee that the group can view the page, as it does not account for
 * account-inherited restrictions, space permissions, or even product access. For more information, see [Confluence
 * permissions](https://confluence.atlassian.com/x/_AozKw).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
 */
export async function getIndividualGroupRestrictionStatusByGroupId(
  client: Client,
  parameters: GetIndividualGroupRestrictionStatusByGroupId,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/byGroupId/${parameters.groupId}`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/**
 * Adds a group to a content restriction by Group Id. That is, grant read or update permission to the group for a piece
 * of content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function addGroupToContentRestrictionByGroupId(
  client: Client,
  parameters: AddGroupToContentRestrictionByGroupId,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/byGroupId/${parameters.groupId}`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
  };

  return await client.sendRequest(config);
}

/**
 * Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of
 * content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function removeGroupFromContentRestriction(
  client: Client,
  parameters: RemoveGroupFromContentRestriction,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/byGroupId/${parameters.groupId}`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns whether the specified content restriction applies to a user. For example, if a page with `id=123` has a
 * `read` restriction for a user with an account ID of `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`, the following
 * request will return `true`:
 *
 * `/wiki/rest/api/content/123/restriction/byOperation/read/user?accountId=384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`
 *
 * Note that a response of `true` does not guarantee that the user can view the page, as it does not account for
 * account-inherited restrictions, space permissions, or even product access. For more information, see [Confluence
 * permissions](https://confluence.atlassian.com/x/_AozKw).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
 */
export async function getContentRestrictionStatusForUser(
  client: Client,
  parameters: GetContentRestrictionStatusForUser,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/user`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Adds a user to a content restriction. That is, grant read or update permission to the user for a piece of content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function addUserToContentRestriction(
  client: Client,
  parameters: AddUserToContentRestriction,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/user`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
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
 * Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of
 * content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function removeUserFromContentRestriction(
  client: Client,
  parameters: RemoveUserFromContentRestriction,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/user`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      key: parameters.key,
      username: parameters.username,
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}
