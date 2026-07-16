import { VersionSchema, type Version } from '../models/version';
import type { RestoreContentVersion } from '../parameters/restoreContentVersion';
import type { DeleteContentVersion } from '../parameters/deleteContentVersion';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Restores a historical version to be the latest version. That is, a new version is created with the content of the
 * historical version.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function restoreContentVersion(client: Client, parameters: RestoreContentVersion): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: `/wiki/rest/api/content/${parameters.id}/version`,
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      operationKey: parameters.operationKey,
      params: parameters.params,
    },
    schema: VersionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a historical version. This does not delete the changes made to the content in that version, rather the changes
 * for the deleted version are rolled up into the next version. Note, you cannot delete the current version.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function deleteContentVersion(client: Client, parameters: DeleteContentVersion): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/version/${parameters.versionNumber}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
