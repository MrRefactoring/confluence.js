import { SpacePropertiesSchema, type SpaceProperties } from '#/models/spaceProperties';
import { SpacePropertySchema, type SpaceProperty } from '#/models/spaceProperty';
import type { GetSpaceProperties } from '#/parameters/getSpaceProperties';
import type { CreateSpaceProperty } from '#/parameters/createSpaceProperty';
import type { GetSpacePropertyById } from '#/parameters/getSpacePropertyById';
import type { UpdateSpacePropertyById } from '#/parameters/updateSpacePropertyById';
import type { DeleteSpacePropertyById } from '#/parameters/deleteSpacePropertyById';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Returns all properties for the given space. Space properties are a key-value storage associated with a space. The
 * limit parameter specifies the maximum number of results returned in a single response. Use the `link` response header
 * to paginate through additional results.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission) and 'View' permission for the space.
 */
export async function getSpaceProperties(client: Client, parameters: GetSpaceProperties): Promise<SpaceProperties> {
  const config: SendRequestOptions<SpaceProperties> = {
    url: `/spaces/${parameters.spaceId}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: SpacePropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new space property.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission) and 'Admin' permission for the space.
 */
export async function createSpaceProperty(client: Client, parameters: CreateSpaceProperty): Promise<SpaceProperty> {
  const config: SendRequestOptions<SpaceProperty> = {
    url: `/spaces/${parameters.spaceId}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: SpacePropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve a space property by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission) and 'View' permission for the space.
 */
export async function getSpacePropertyById(client: Client, parameters: GetSpacePropertyById): Promise<SpaceProperty> {
  const config: SendRequestOptions<SpaceProperty> = {
    url: `/spaces/${parameters.spaceId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: SpacePropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a space property by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission) and 'Admin' permission for the space.
 */
export async function updateSpacePropertyById(
  client: Client,
  parameters: UpdateSpacePropertyById,
): Promise<SpaceProperty> {
  const config: SendRequestOptions<SpaceProperty> = {
    url: `/spaces/${parameters.spaceId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: SpacePropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a space property by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission) and 'Admin' permission for the space.
 */
export async function deleteSpacePropertyById(client: Client, parameters: DeleteSpacePropertyById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/spaces/${parameters.spaceId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
