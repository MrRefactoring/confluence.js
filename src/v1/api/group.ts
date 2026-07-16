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
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns all user groups. The returned groups are ordered alphabetically in ascending order by group name.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getGroups(client: Client, parameters?: GetGroups): Promise<GroupArrayWithLinks> {
  const config: SendRequestOptions<GroupArrayWithLinks> = {
    url: '/wiki/rest/api/group',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
      accessType: parameters?.accessType,
    },
    schema: GroupArrayWithLinksSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new user group.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
 */
export async function createGroup(client: Client, parameters: CreateGroup): Promise<Group> {
  const config: SendRequestOptions<Group> = {
    url: '/wiki/rest/api/group',
    method: 'POST',
    body: {
      name: parameters.name,
    },
    schema: GroupSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a user group for a given group id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getGroupByGroupId(client: Client, parameters: GetGroupByGroupId): Promise<Group> {
  const config: SendRequestOptions<Group> = {
    url: '/wiki/rest/api/group/by-id',
    method: 'GET',
    searchParams: {
      id: parameters.id,
    },
    schema: GroupSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete user group.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
 */
export async function removeGroupById(client: Client, parameters: RemoveGroupById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/api/group/by-id',
    method: 'DELETE',
    searchParams: {
      id: parameters.id,
    },
  };

  return await client.sendRequest(config);
}

/** Get search results of groups by partial query provided. */
export async function searchGroups(client: Client, parameters: SearchGroups): Promise<GroupArrayWithLinks> {
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
): Promise<UserArray> {
  const config: SendRequestOptions<UserArray> = {
    url: `/wiki/rest/api/group/${parameters.groupId}/membersByGroupId`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
      shouldReturnTotalSize: parameters.shouldReturnTotalSize,
      expand: parameters.expand,
    },
    schema: UserArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds a user as a member in a group represented by its groupId
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
 */
export async function addUserToGroupByGroupId(client: Client, parameters: AddUserToGroupByGroupId): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/api/group/userByGroupId',
    method: 'POST',
    searchParams: {
      groupId: parameters.groupId,
    },
    body: {
      accountId: parameters.accountId,
    },
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
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/api/group/userByGroupId',
    method: 'DELETE',
    searchParams: {
      groupId: parameters.groupId,
      accountId: parameters.accountId,
      key: parameters.key,
      username: parameters.username,
    },
  };

  return await client.sendRequest(config);
}
