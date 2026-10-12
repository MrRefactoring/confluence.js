import { ForgeAppPropertiesSchema, type ForgeAppProperties } from '../models/forgeAppProperties';
import { ForgeAppPropertySchema, type ForgeAppProperty } from '../models/forgeAppProperty';
import type { GetForgeAppProperties } from '../parameters/getForgeAppProperties';
import type { GetForgeAppProperty } from '../parameters/getForgeAppProperty';
import type { PutForgeAppProperty } from '../parameters/putForgeAppProperty';
import type { DeleteForgeAppProperty } from '../parameters/deleteForgeAppProperty';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Gets Forge app properties. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestconfluence/#method-signature)**
 * requests from Forge.
 */
export async function getForgeAppProperties(
  client: Client,
  parameters?: GetForgeAppProperties,
  options?: RequestOptions,
): Promise<ForgeAppProperties> {
  const config: SendRequestOptions<ForgeAppProperties> = {
    url: '/wiki/api/v2/app/properties',
    method: 'GET',
    searchParams: {
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: ForgeAppPropertiesSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Gets a Forge app property by property key. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestconfluence/#method-signature)**
 * requests from Forge.
 */
export async function getForgeAppProperty(
  client: Client,
  parameters: GetForgeAppProperty,
  options?: RequestOptions,
): Promise<ForgeAppProperty> {
  const config: SendRequestOptions<ForgeAppProperty> = {
    url: `/wiki/api/v2/app/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: ForgeAppPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates or updates a Forge app property. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestconfluence/#method-signature)**
 * requests from Forge.
 */
export async function putForgeAppProperty(
  client: Client,
  parameters: PutForgeAppProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/app/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a Forge app property. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestconfluence/#method-signature)**
 * requests from Forge.
 */
export async function deleteForgeAppProperty(
  client: Client,
  parameters: DeleteForgeAppProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/app/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
