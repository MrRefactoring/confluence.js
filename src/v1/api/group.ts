import { GroupArrayWithLinksSchema, type GroupArrayWithLinks } from '../models/groupArrayWithLinks';
import { GroupSchema, type Group } from '../models/group';
import { UserArraySchema, type UserArray } from '../models/userArray';
import type { GetGroups } from '../parameters/getGroups';
import type { CreateGroup } from '../parameters/createGroup';
import type { GetGroupByGroupId } from '../parameters/getGroupByGroupId';
import type { RemoveGroupById } from '../parameters/removeGroupById';
import type { SearchGroups } from '../parameters/searchGroups';
import type { GetGroupMembersByGroupId } from '../parameters/getGroupMembersByGroupId';
import type { AddUserToGroupByGroupId } from '../parameters/addUserToGroupByGroupId';
import type { RemoveMemberFromGroupByGroupId } from '../parameters/removeMemberFromGroupByGroupId';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns all user groups. The returned groups are ordered alphabetically in ascending order by group name.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getGroups(
  client: Client,
  parameters?: GetGroups,
  options?: RequestOptions,
): Promise<GroupArrayWithLinks> {
  const config: SendRequestOptions<GroupArrayWithLinks> = {
    url: '/wiki/rest/api/group',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
      accessType: parameters?.accessType,
    },
    schema: GroupArrayWithLinksSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new user group.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
 */
export async function createGroup(client: Client, parameters: CreateGroup, options?: RequestOptions): Promise<Group> {
  const config: SendRequestOptions<Group> = {
    url: '/wiki/rest/api/group',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      name: parameters.name,
    },
    schema: GroupSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a user group for a given group id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getGroupByGroupId(
  client: Client,
  parameters: GetGroupByGroupId,
  options?: RequestOptions,
): Promise<Group> {
  const config: SendRequestOptions<Group> = {
    url: '/wiki/rest/api/group/by-id',
    method: 'GET',
    searchParams: {
      id: parameters.id,
    },
    schema: GroupSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Delete user group.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
 */
export async function removeGroupById(
  client: Client,
  parameters: RemoveGroupById,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/api/group/by-id',
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      id: parameters.id,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get search results of groups by partial query provided. */
export async function searchGroups(
  client: Client,
  parameters: SearchGroups,
  options?: RequestOptions,
): Promise<GroupArrayWithLinks> {
  const config: SendRequestOptions<GroupArrayWithLinks> = {
    url: '/wiki/rest/api/group/picker',
    method: 'GET',
    searchParams: {
      query: parameters.query,
      start: parameters.start,
      limit: parameters.limit,
      shouldReturnTotalSize: parameters.shouldReturnTotalSize,
    },
    schema: GroupArrayWithLinksSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the users that are members of a group.
 *
 * Use updated Get group API
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getGroupMembersByGroupId(
  client: Client,
  parameters: GetGroupMembersByGroupId,
  options?: RequestOptions,
): Promise<UserArray> {
  const config: SendRequestOptions<UserArray> = {
    url: `/wiki/rest/api/group/${parameters.groupId}/membersByGroupId`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
      shouldReturnTotalSize: parameters.shouldReturnTotalSize,
      expand: Array.isArray(parameters.expand) ? parameters.expand.join(',') : parameters.expand,
    },
    schema: UserArraySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Adds a user as a member in a group represented by its groupId
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
 */
export async function addUserToGroupByGroupId(
  client: Client,
  parameters: AddUserToGroupByGroupId,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/api/group/userByGroupId',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      groupId: parameters.groupId,
    },
    body: {
      accountId: parameters.accountId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Remove user as a member from a group.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
 */
export async function removeMemberFromGroupByGroupId(
  client: Client,
  parameters: RemoveMemberFromGroupByGroupId,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/api/group/userByGroupId',
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      groupId: parameters.groupId,
      accountId: parameters.accountId,
      key: parameters.key,
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
