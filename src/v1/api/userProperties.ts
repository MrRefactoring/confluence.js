import { UserPropertyKeyArraySchema, type UserPropertyKeyArray } from '../models/userPropertyKeyArray';
import { UserPropertySchema, type UserProperty } from '../models/userProperty';
import type { GetUserProperties } from '../parameters/getUserProperties';
import type { GetUserProperty } from '../parameters/getUserProperty';
import type { CreateUserProperty } from '../parameters/createUserProperty';
import type { UpdateUserProperty } from '../parameters/updateUserProperty';
import type { DeleteUserProperty } from '../parameters/deleteUserProperty';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the properties for a user as list of property keys. For more information about user properties, see
 * [Confluence entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/).
 * `Note`, these properties stored against a user are on a Confluence site level and not space/content level.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getUserProperties(client: Client, parameters: GetUserProperties): Promise<UserPropertyKeyArray> {
  const config: SendRequestOptions<UserPropertyKeyArray> = {
    url: `/wiki/rest/api/user/${parameters.userId}/property`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: UserPropertyKeyArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the property corresponding to `key` for a user. For more information about user properties, see [Confluence
 * entity properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these
 * properties stored against a user are on a Confluence site level and not space/content level.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getUserProperty(client: Client, parameters: GetUserProperty): Promise<UserProperty> {
  const config: SendRequestOptions<UserProperty> = {
    url: `/wiki/rest/api/user/${parameters.userId}/property/${parameters.key}`,
    method: 'GET',
    schema: UserPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a property for a user. For more information about user properties, see [Confluence entity properties]
 * (https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these properties stored
 * against a user are on a Confluence site level and not space/content level.
 *
 * `Note:` the number of properties which could be created per app in a tenant for each user might be restricted by
 * fixed system limits. **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the
 * Confluence site ('Can use' global permission).
 */
export async function createUserProperty(client: Client, parameters: CreateUserProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/${parameters.userId}/property/${parameters.key}`,
    method: 'POST',
    body: {
      value: parameters.value,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Updates a property for the given user. Note, you cannot update the key of a user property, only the value. For more
 * information about user properties, see [Confluence entity
 * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these properties
 * stored against a user are on a Confluence site level and not space/content level.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function updateUserProperty(client: Client, parameters: UpdateUserProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/${parameters.userId}/property/${parameters.key}`,
    method: 'PUT',
    body: {
      value: parameters.value,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a property for the given user. For more information about user properties, see [Confluence entity
 * properties](https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these properties
 * stored against a user are on a Confluence site level and not space/content level.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function deleteUserProperty(client: Client, parameters: DeleteUserProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/user/${parameters.userId}/property/${parameters.key}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
