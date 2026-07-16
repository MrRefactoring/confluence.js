import { SmartLinkSchema, type SmartLink } from '#/models/smartLink';
import type { CreateSmartLink } from '#/parameters/createSmartLink';
import type { GetSmartLinkById } from '#/parameters/getSmartLinkById';
import type { DeleteSmartLink } from '#/parameters/deleteSmartLink';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Creates a Smart Link in the content tree in the space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the corresponding space.
 * Permission to create a Smart Link in the content tree in the space.
 */
export async function createSmartLink(client: Client, parameters: CreateSmartLink): Promise<SmartLink> {
  const config: SendRequestOptions<SmartLink> = {
    url: '/embeds',
    method: 'POST',
    body: parameters.body,
    schema: SmartLinkSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific Smart Link in the content tree.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the Smart Link in the
 * content tree and its corresponding space.
 */
export async function getSmartLinkById(client: Client, parameters: GetSmartLinkById): Promise<SmartLink> {
  const config: SendRequestOptions<SmartLink> = {
    url: `/embeds/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'include-collaborators': parameters.includeCollaborators,
      'include-direct-children': parameters.includeDirectChildren,
      'include-operations': parameters.includeOperations,
      'include-properties': parameters.includeProperties,
    },
    schema: SmartLinkSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a Smart Link in the content tree by id.
 *
 * Deleting a Smart Link in the content tree moves the Smart Link to the trash, where it can be restored later
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the Smart Link in the
 * content tree and its corresponding space. Permission to delete Smart Links in the content tree in the space.
 */
export async function deleteSmartLink(client: Client, parameters: DeleteSmartLink): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/embeds/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
