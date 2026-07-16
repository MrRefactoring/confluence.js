import { SpaceSettingsSchema, type SpaceSettings } from '../models/spaceSettings';
import type { GetSpaceSettings } from '../parameters/getSpaceSettings';
import type { UpdateSpaceSettings } from '../parameters/updateSpaceSettings';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the settings of a space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space.
 */
export async function getSpaceSettings(client: Client, parameters: GetSpaceSettings): Promise<SpaceSettings> {
  const config: SendRequestOptions<SpaceSettings> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/settings`,
    method: 'GET',
    schema: SpaceSettingsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the settings for a space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function updateSpaceSettings(client: Client, parameters: UpdateSpaceSettings): Promise<SpaceSettings> {
  const config: SendRequestOptions<SpaceSettings> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/settings`,
    method: 'PUT',
    body: {
      routeOverrideEnabled: parameters.routeOverrideEnabled,
      contentMode: parameters.contentMode,
    },
    schema: SpaceSettingsSchema,
  };

  return await client.sendRequest(config);
}
