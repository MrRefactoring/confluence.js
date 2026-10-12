import { WhiteboardSchema, type Whiteboard } from '../models/whiteboard';
import type { CreateWhiteboard } from '../parameters/createWhiteboard';
import type { GetWhiteboardById } from '../parameters/getWhiteboardById';
import type { DeleteWhiteboard } from '../parameters/deleteWhiteboard';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Creates a whiteboard in the space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the corresponding space.
 * Permission to create a whiteboard in the space.
 */
export async function createWhiteboard(
  client: Client,
  parameters: CreateWhiteboard,
  options?: RequestOptions,
): Promise<Whiteboard> {
  const config: SendRequestOptions<Whiteboard> = {
    url: '/wiki/api/v2/whiteboards',
    method: 'POST',
    searchParams: {
      private: parameters.private,
    },
    body: parameters.body,
    schema: WhiteboardSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific whiteboard.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the whiteboard and its
 * corresponding space.
 */
export async function getWhiteboardById(
  client: Client,
  parameters: GetWhiteboardById,
  options?: RequestOptions,
): Promise<Whiteboard> {
  const config: SendRequestOptions<Whiteboard> = {
    url: `/wiki/api/v2/whiteboards/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'include-collaborators': parameters.includeCollaborators,
      'include-direct-children': parameters.includeDirectChildren,
      'include-operations': parameters.includeOperations,
      'include-properties': parameters.includeProperties,
    },
    schema: WhiteboardSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a whiteboard by id.
 *
 * Deleting a whiteboard moves the whiteboard to the trash, where it can be restored later
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the whiteboard and its
 * corresponding space. Permission to delete whiteboards in the space.
 */
export async function deleteWhiteboard(
  client: Client,
  parameters: DeleteWhiteboard,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/whiteboards/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
