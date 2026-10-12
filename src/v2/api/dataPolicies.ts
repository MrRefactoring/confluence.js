import { DataPolicyMetadataSchema, type DataPolicyMetadata } from '../models/dataPolicyMetadata';
import { DataPolicySpacesSchema, type DataPolicySpaces } from '../models/dataPolicySpaces';
import type { GetDataPolicySpaces } from '../parameters/getDataPolicySpaces';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns data policy metadata for the workspace.
 *
 * **[Permissions](#permissions) required:** Only apps can make this request. Permission to access the Confluence site
 * ('Can use' global permission).
 */
export async function getDataPolicyMetadata(client: Client, options?: RequestOptions): Promise<DataPolicyMetadata> {
  const config: SendRequestOptions<DataPolicyMetadata> = {
    url: '/wiki/api/v2/data-policies/metadata',
    method: 'GET',
    schema: DataPolicyMetadataSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all spaces. The results will be sorted by id ascending. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Only apps can make this request. Permission to
 * access the Confluence site ('Can use' global permission). Only spaces that the app has permission to view will be
 * returned.
 */
export async function getDataPolicySpaces(
  client: Client,
  parameters?: GetDataPolicySpaces,
  options?: RequestOptions,
): Promise<DataPolicySpaces> {
  const config: SendRequestOptions<DataPolicySpaces> = {
    url: '/wiki/api/v2/data-policies/spaces',
    method: 'GET',
    searchParams: {
      ids: parameters?.ids,
      keys: parameters?.keys,
      sort: parameters?.sort,
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: DataPolicySpacesSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
