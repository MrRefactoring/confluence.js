import {
  ListSpacePermissionCombinationsResponseSchema,
  type ListSpacePermissionCombinationsResponse,
} from '#/models/listSpacePermissionCombinationsResponse';
import { BulkTransitionTaskSchema, type BulkTransitionTask } from '#/models/bulkTransitionTask';
import { BulkTransitionTaskStatusSchema, type BulkTransitionTaskStatus } from '#/models/bulkTransitionTaskStatus';
import type { ListSpacePermissionCombinations } from '#/parameters/listSpacePermissionCombinations';
import type { BulkAssignSpacePermissionRoles } from '#/parameters/bulkAssignSpacePermissionRoles';
import type { BulkRemoveSpacePermissionAccess } from '#/parameters/bulkRemoveSpacePermissionAccess';
import type { GetSpacePermissionTransitionTaskStatus } from '#/parameters/getSpacePermissionTransitionTaskStatus';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Lists the unique unassigned space permission combinations currently present on the tenant. Combinations that already
 * map to a space role are filtered out server-side. Each row carries the decoded set of space permissions and the
 * principal types that currently hold the combination — these inform which `principalType` values are valid to include
 * in the matching bulk role-assignments request.
 *
 * Results are always sorted by `principalCount` descending. Sort field and sort order are not configurable; page size
 * is controlled by the `limit` query parameter (default 25, min 1, max 250). Use the `cursor` field to page through
 * additional results. The `generatedAt` field reflects the last audit run that populated the combinations table — call
 * the generate-combinations endpoint to refresh stale data.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a Confluence administrator.
 */
export async function listSpacePermissionCombinations(
  client: Client,
  parameters?: ListSpacePermissionCombinations,
): Promise<ListSpacePermissionCombinationsResponse> {
  const config: SendRequestOptions<ListSpacePermissionCombinationsResponse> = {
    url: '/space-permissions/transition/combinations',
    method: 'GET',
    searchParams: {
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: ListSpacePermissionCombinationsResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Submits a task to refresh the space permission combinations in the database, which identifies all unique permission
 * combinations across the site. This provides permission combination IDs that can be used with the assign-roles and
 * remove-access endpoints.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a Confluence administrator.
 */
export async function generateSpacePermissionCombinations(client: Client): Promise<BulkTransitionTask> {
  const config: SendRequestOptions<BulkTransitionTask> = {
    url: '/space-permissions/transition/combinations',
    method: 'POST',
    schema: BulkTransitionTaskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk assigns roles for one or more permission combination IDs obtained from the space permission combinations.
 * Supports targeting all spaces, specific spaces, or excluding specific spaces.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a Confluence administrator.
 */
export async function bulkAssignSpacePermissionRoles(
  client: Client,
  parameters: BulkAssignSpacePermissionRoles,
): Promise<BulkTransitionTask> {
  const config: SendRequestOptions<BulkTransitionTask> = {
    url: '/space-permissions/transition/role-assignments',
    method: 'POST',
    body: {
      assignments: parameters.assignments,
      spaceSelection: parameters.spaceSelection,
    },
    schema: BulkTransitionTaskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk removes access for one or more permission combination IDs obtained from the space permission combinations. This
 * removes all space permissions for the specified combinations across the targeted spaces.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a Confluence administrator.
 */
export async function bulkRemoveSpacePermissionAccess(
  client: Client,
  parameters: BulkRemoveSpacePermissionAccess,
): Promise<BulkTransitionTask> {
  const config: SendRequestOptions<BulkTransitionTask> = {
    url: '/space-permissions/transition/access-removals',
    method: 'POST',
    body: {
      permissionCombinationIds: parameters.permissionCombinationIds,
      spaceSelection: parameters.spaceSelection,
    },
    schema: BulkTransitionTaskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the status of an async space permission transition task. Use the taskId returned from the
 * generate-combinations, assign-roles, or remove-access endpoints to poll for progress and completion.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a Confluence administrator.
 */
export async function getSpacePermissionTransitionTaskStatus(
  client: Client,
  parameters: GetSpacePermissionTransitionTaskStatus,
): Promise<BulkTransitionTaskStatus> {
  const config: SendRequestOptions<BulkTransitionTaskStatus> = {
    url: `/space-permissions/transition/tasks/${parameters.taskId}`,
    method: 'GET',
    schema: BulkTransitionTaskStatusSchema,
  };

  return await client.sendRequest(config);
}
