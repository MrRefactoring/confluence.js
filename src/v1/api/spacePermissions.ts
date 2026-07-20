import { SpacePermissionV2Schema, type SpacePermissionV2 } from '../models/spacePermissionV2';
import type { AddPermissionToSpace } from '../parameters/addPermissionToSpace';
import type { AddCustomContentPermissions } from '../parameters/addCustomContentPermissions';
import type { RemovePermission } from '../parameters/removePermission';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Adds new permission to space.
 *
 * If the permission to be added is a group permission, the group can be identified by its group name or group id.
 *
 * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function addPermissionToSpace(
  client: Client,
  parameters: AddPermissionToSpace,
): Promise<SpacePermissionV2> {
  const config: SendRequestOptions<SpacePermissionV2> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/permission`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      subject: parameters.subject,
      operation: parameters.operation,
      _links: parameters._links,
    },
    schema: SpacePermissionV2Schema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds new custom content permission to space.
 *
 * If the permission to be added is a group permission, the group can be identified by its group name or group id.
 *
 * Note: Only apps can access this REST resource and only make changes to the respective app permissions.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function addCustomContentPermissions(
  client: Client,
  parameters: AddCustomContentPermissions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/permission/custom-content`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      subject: parameters.subject,
      operations: parameters.operations,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Removes a space permission. Note that removing Read Space permission for a user or group will remove all the space
 * permissions for that user or group.
 *
 * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function removePermission(client: Client, parameters: RemovePermission): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/permission/${parameters.id}`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
  };

  return await client.sendRequest(config);
}
