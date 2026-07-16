import { AvailableSpaceRolesSchema, type AvailableSpaceRoles } from '#/models/availableSpaceRoles';
import { SpaceRoleSchema, type SpaceRole } from '#/models/spaceRole';
import { UpdateSpaceRoleResponseSchema, type UpdateSpaceRoleResponse } from '#/models/updateSpaceRoleResponse';
import { DeleteSpaceRoleResponseSchema, type DeleteSpaceRoleResponse } from '#/models/deleteSpaceRoleResponse';
import { SpaceRoleModeSchema, type SpaceRoleMode } from '#/models/spaceRoleMode';
import { SpaceRoleAssignmentsGetSchema, type SpaceRoleAssignmentsGet } from '#/models/spaceRoleAssignmentsGet';
import { SpaceRoleAssignmentsSetSchema, type SpaceRoleAssignmentsSet } from '#/models/spaceRoleAssignmentsSet';
import type { GetAvailableSpaceRoles } from '#/parameters/getAvailableSpaceRoles';
import type { CreateSpaceRole } from '#/parameters/createSpaceRole';
import type { GetSpaceRolesById } from '#/parameters/getSpaceRolesById';
import type { UpdateSpaceRole } from '#/parameters/updateSpaceRole';
import type { DeleteSpaceRole } from '#/parameters/deleteSpaceRole';
import type { GetSpaceRoleAssignments } from '#/parameters/getSpaceRoleAssignments';
import type { SetSpaceRoleAssignments } from '#/parameters/setSpaceRoleAssignments';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Retrieves the available space roles.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site; if
 * requesting a certain space's roles, permission to view the space.
 */
export async function getAvailableSpaceRoles(
  client: Client,
  parameters?: GetAvailableSpaceRoles,
): Promise<AvailableSpaceRoles> {
  const config: SendRequestOptions<AvailableSpaceRoles> = {
    url: '/space-roles',
    method: 'GET',
    searchParams: {
      'space-id': parameters?.spaceId,
      'role-type': parameters?.roleType,
      'principal-id': parameters?.principalId,
      'principal-type': parameters?.principalType,
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: AvailableSpaceRolesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Create a space role.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be an organization or site admin.
 * Connect and Forge app users are not authorized to access this resource.
 */
export async function createSpaceRole(client: Client, parameters: CreateSpaceRole): Promise<SpaceRole> {
  const config: SendRequestOptions<SpaceRole> = {
    url: '/space-roles',
    method: 'POST',
    body: {
      name: parameters.name,
      description: parameters.description,
      spacePermissions: parameters.spacePermissions,
    },
    schema: SpaceRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the space role by ID.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site.
 */
export async function getSpaceRolesById(client: Client, parameters: GetSpaceRolesById): Promise<SpaceRole> {
  const config: SendRequestOptions<SpaceRole> = {
    url: `/space-roles/${parameters.id}`,
    method: 'GET',
    schema: SpaceRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a space role.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be an organization or site admin.
 * Connect and Forge app users are not authorized to access this resource.
 */
export async function updateSpaceRole(client: Client, parameters: UpdateSpaceRole): Promise<UpdateSpaceRoleResponse> {
  const config: SendRequestOptions<UpdateSpaceRoleResponse> = {
    url: `/space-roles/${parameters.id}`,
    method: 'PUT',
    body: {
      name: parameters.name,
      description: parameters.description,
      spacePermissions: parameters.spacePermissions,
      anonymousReassignmentRoleId: parameters.anonymousReassignmentRoleId,
      guestReassignmentRoleId: parameters.guestReassignmentRoleId,
    },
    schema: UpdateSpaceRoleResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a space role
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be an organization or site admin.
 * Connect and Forge app users are not authorized to access this resource.
 */
export async function deleteSpaceRole(client: Client, parameters: DeleteSpaceRole): Promise<DeleteSpaceRoleResponse> {
  const config: SendRequestOptions<DeleteSpaceRoleResponse> = {
    url: `/space-roles/${parameters.id}`,
    method: 'DELETE',
    schema: DeleteSpaceRoleResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the space role mode.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getSpaceRoleMode(client: Client): Promise<SpaceRoleMode> {
  const config: SendRequestOptions<SpaceRoleMode> = {
    url: '/space-role-mode',
    method: 'GET',
    schema: SpaceRoleModeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the space role assignments.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the space.
 */
export async function getSpaceRoleAssignments(
  client: Client,
  parameters: GetSpaceRoleAssignments,
): Promise<SpaceRoleAssignmentsGet> {
  const config: SendRequestOptions<SpaceRoleAssignmentsGet> = {
    url: `/spaces/${parameters.id}/role-assignments`,
    method: 'GET',
    searchParams: {
      'role-id': parameters.roleId,
      'role-type': parameters.roleType,
      'principal-id': parameters.principalId,
      'principal-type': parameters.principalType,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: SpaceRoleAssignmentsGetSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets space role assignments as specified in the payload. For each entry, if `roleId` is provided the principal is
 * assigned to that role. If `roleId` is omitted, the role assignment for that principal is removed, if it exists.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to manage roles in the space.
 */
export async function setSpaceRoleAssignments(
  client: Client,
  parameters: SetSpaceRoleAssignments,
): Promise<SpaceRoleAssignmentsSet> {
  const config: SendRequestOptions<SpaceRoleAssignmentsSet> = {
    url: `/spaces/${parameters.id}/role-assignments`,
    method: 'POST',
    body: parameters.body,
    schema: SpaceRoleAssignmentsSetSchema,
  };

  return await client.sendRequest(config);
}
