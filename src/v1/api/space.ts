import { SpaceSchema, type Space } from '../models/space';
import { LongTaskSchema, type LongTask } from '../models/longTask';
import type { CreateSpace } from '../parameters/createSpace';
import type { CreatePrivateSpace } from '../parameters/createPrivateSpace';
import type { UpdateSpace } from '../parameters/updateSpace';
import type { DeleteSpace } from '../parameters/deleteSpace';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Creates a new space. Note, currently you cannot set space labels when creating a space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Create Space(s)' global permission.
 */
export async function createSpace(client: Client, parameters: CreateSpace): Promise<Space> {
  const config: SendRequestOptions<Space> = {
    url: '/wiki/rest/api/space',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      name: parameters.name,
      key: parameters.key,
      alias: parameters.alias,
      description: parameters.description,
      permissions: parameters.permissions,
    },
    schema: SpaceSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new space that is only visible to the creator. This method is the same as the [Create
 * space](#api-space-post) method with permissions set to the current user only. Note, currently you cannot set space
 * labels when creating a space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Create Space(s)' global permission.
 */
export async function createPrivateSpace(client: Client, parameters: CreatePrivateSpace): Promise<Space> {
  const config: SendRequestOptions<Space> = {
    url: '/wiki/rest/api/space/_private',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      name: parameters.name,
      key: parameters.key,
      alias: parameters.alias,
      description: parameters.description,
      permissions: parameters.permissions,
    },
    schema: SpaceSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the name, description, or homepage of a space.
 *
 * - For security reasons, permissions cannot be updated via the API and must be changed via the user interface instead.
 * - Currently you cannot set space labels when updating a space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function updateSpace(client: Client, parameters: UpdateSpace): Promise<Space> {
  const config: SendRequestOptions<Space> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      name: parameters.name,
      description: parameters.description,
      homepage: parameters.homepage,
      type: parameters.type,
      status: parameters.status,
    },
    schema: SpaceSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Permanently deletes a space without sending it to the trash. Note, the space will be deleted in a long running task.
 * Therefore, the space may not be deleted yet when this method has returned. Clients should poll the status link that
 * is returned in the response until the task completes.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function deleteSpace(client: Client, parameters: DeleteSpace): Promise<LongTask> {
  const config: SendRequestOptions<LongTask> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    schema: LongTaskSchema,
  };

  return await client.sendRequest(config);
}
