import { VersionSchema, type Version } from '../models/version';
import type { RestoreContentVersion } from '../parameters/restoreContentVersion';
import type { DeleteContentVersion } from '../parameters/deleteContentVersion';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Restores a historical version to be the latest version. That is, a new version is created with the content of the
 * historical version.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function restoreContentVersion(
  client: Client,
  parameters: RestoreContentVersion,
  options?: RequestOptions,
): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: `/wiki/rest/api/content/${parameters.id}/version`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      expand: Array.isArray(parameters.expand) ? parameters.expand.join(',') : parameters.expand,
    },
    body: {
      operationKey: parameters.operationKey,
      params: parameters.params,
    },
    schema: VersionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a historical version. This does not delete the changes made to the content in that version, rather the changes
 * for the deleted version are rolled up into the next version. Note, you cannot delete the current version.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function deleteContentVersion(
  client: Client,
  parameters: DeleteContentVersion,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/version/${parameters.versionNumber}`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
