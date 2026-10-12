import { SpaceSettingsSchema, type SpaceSettings } from '../models/spaceSettings';
import type { GetSpaceSettings } from '../parameters/getSpaceSettings';
import type { UpdateSpaceSettings } from '../parameters/updateSpaceSettings';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the settings of a space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space.
 */
export async function getSpaceSettings(
  client: Client,
  parameters: GetSpaceSettings,
  options?: RequestOptions,
): Promise<SpaceSettings> {
  const config: SendRequestOptions<SpaceSettings> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/settings`,
    method: 'GET',
    schema: SpaceSettingsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the settings for a space.
 *
 * **[Permissions](https://support.atlassian.com/confluence-cloud/docs/what-are-confluences-roles/) required**:
 * [`manage/space`](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space-permissions/#api-space-permissions-get)
 * permission for the space.
 *
 * **Note:** To find the display name for each permission ID, call the [Get available space
 * permissions](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space-permissions/#api-space-permissions-get)
 * API.
 */
export async function updateSpaceSettings(
  client: Client,
  parameters: UpdateSpaceSettings,
  options?: RequestOptions,
): Promise<SpaceSettings> {
  const config: SendRequestOptions<SpaceSettings> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/settings`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      routeOverrideEnabled: parameters.routeOverrideEnabled,
      contentMode: parameters.contentMode,
    },
    schema: SpaceSettingsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
