import { SpacesSchema, type Spaces } from '../models/spaces';
import { SpaceSummarySchema, type SpaceSummary } from '../models/spaceSummary';
import { SpaceSchema, type Space } from '../models/space';
import type { GetSpaces } from '../parameters/getSpaces';
import type { CreateSpace } from '../parameters/createSpace';
import type { GetSpaceById } from '../parameters/getSpaceById';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns all spaces. The results will be sorted by id ascending. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only spaces that the user has permission to view will be returned.
 */
export async function getSpaces(client: Client, parameters?: GetSpaces): Promise<Spaces> {
  const config: SendRequestOptions<Spaces> = {
    url: '/wiki/api/v2/spaces',
    method: 'GET',
    searchParams: {
      ids: parameters?.ids,
      keys: parameters?.keys,
      type: parameters?.type,
      status: parameters?.status,
      labels: parameters?.labels,
      'favorited-by': parameters?.favoritedBy,
      'not-favorited-by': parameters?.notFavoritedBy,
      sort: parameters?.sort,
      'description-format': parameters?.descriptionFormat,
      'include-icon': parameters?.includeIcon,
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: SpacesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a Space as specified in the payload.
 *
 * Available on tenants with [Role-Based Access
 * Control](https://support.atlassian.com/confluence-cloud/docs/manage-user-roles/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to create spaces.
 */
export async function createSpace(client: Client, parameters: CreateSpace): Promise<SpaceSummary> {
  const config: SendRequestOptions<SpaceSummary> = {
    url: '/wiki/api/v2/spaces',
    method: 'POST',
    body: parameters.body,
    schema: SpaceSummarySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the space.
 */
export async function getSpaceById(client: Client, parameters: GetSpaceById): Promise<Space> {
  const config: SendRequestOptions<Space> = {
    url: `/wiki/api/v2/spaces/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'description-format': parameters.descriptionFormat,
      'include-icon': parameters.includeIcon,
      'include-operations': parameters.includeOperations,
      'include-properties': parameters.includeProperties,
      'include-permissions': parameters.includePermissions,
      'include-role-assignments': parameters.includeRoleAssignments,
      'include-labels': parameters.includeLabels,
    },
    schema: SpaceSchema,
  };

  return await client.sendRequest(config);
}
