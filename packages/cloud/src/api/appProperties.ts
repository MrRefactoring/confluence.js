import { ForgeAppPropertiesSchema, type ForgeAppProperties } from '#/models/forgeAppProperties';
import { ForgeAppPropertySchema, type ForgeAppProperty } from '#/models/forgeAppProperty';
import type { GetForgeAppProperties } from '#/parameters/getForgeAppProperties';
import type { GetForgeAppProperty } from '#/parameters/getForgeAppProperty';
import type { PutForgeAppProperty } from '#/parameters/putForgeAppProperty';
import type { DeleteForgeAppProperty } from '#/parameters/deleteForgeAppProperty';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Gets Forge app properties. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestconfluence/#method-signature)**
 * requests from Forge.
 */
export async function getForgeAppProperties(
  client: Client,
  parameters?: GetForgeAppProperties,
): Promise<ForgeAppProperties> {
  const config: SendRequestOptions<ForgeAppProperties> = {
    url: '/app/properties',
    method: 'GET',
    searchParams: {
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: ForgeAppPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Gets a Forge app property by property key. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestconfluence/#method-signature)**
 * requests from Forge.
 */
export async function getForgeAppProperty(client: Client, parameters: GetForgeAppProperty): Promise<ForgeAppProperty> {
  const config: SendRequestOptions<ForgeAppProperty> = {
    url: `/app/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: ForgeAppPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates or updates a Forge app property. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestconfluence/#method-signature)**
 * requests from Forge.
 */
export async function putForgeAppProperty(client: Client, parameters: PutForgeAppProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/app/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a Forge app property. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestconfluence/#method-signature)**
 * requests from Forge.
 */
export async function deleteForgeAppProperty(client: Client, parameters: DeleteForgeAppProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/app/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
