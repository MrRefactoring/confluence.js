import {
  SpacePermissionsAssignmentsSchema,
  type SpacePermissionsAssignments,
} from '../models/spacePermissionsAssignments';
import { AvailableSpacePermissionsSchema, type AvailableSpacePermissions } from '../models/availableSpacePermissions';
import type { GetSpacePermissionsAssignments } from '../parameters/getSpacePermissionsAssignments';
import type { GetAvailableSpacePermissions } from '../parameters/getAvailableSpacePermissions';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns space permission assignments for a specific space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the space.
 */
export async function getSpacePermissionsAssignments(
  client: Client,
  parameters: GetSpacePermissionsAssignments,
  options?: RequestOptions,
): Promise<SpacePermissionsAssignments> {
  const config: SendRequestOptions<SpacePermissionsAssignments> = {
    url: `/wiki/api/v2/spaces/${parameters.id}/permissions`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: SpacePermissionsAssignmentsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the available space permissions.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site.
 */
export async function getAvailableSpacePermissions(
  client: Client,
  parameters?: GetAvailableSpacePermissions,
  options?: RequestOptions,
): Promise<AvailableSpacePermissions> {
  const config: SendRequestOptions<AvailableSpacePermissions> = {
    url: '/wiki/api/v2/space-permissions',
    method: 'GET',
    searchParams: {
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: AvailableSpacePermissionsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
