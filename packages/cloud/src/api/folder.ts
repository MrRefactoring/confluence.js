import { FolderSchema, type Folder } from '#/models/folder';
import type { CreateFolder } from '#/parameters/createFolder';
import type { GetFolderById } from '#/parameters/getFolderById';
import type { DeleteFolder } from '#/parameters/deleteFolder';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Creates a folder in the space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the corresponding space.
 * Permission to create a folder in the space.
 */
export async function createFolder(client: Client, parameters: CreateFolder): Promise<Folder> {
  const config: SendRequestOptions<Folder> = {
    url: '/folders',
    method: 'POST',
    body: parameters.body,
    schema: FolderSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific folder.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the folder and its
 * corresponding space.
 */
export async function getFolderById(client: Client, parameters: GetFolderById): Promise<Folder> {
  const config: SendRequestOptions<Folder> = {
    url: `/folders/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'include-collaborators': parameters.includeCollaborators,
      'include-direct-children': parameters.includeDirectChildren,
      'include-operations': parameters.includeOperations,
      'include-properties': parameters.includeProperties,
    },
    schema: FolderSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a folder by id.
 *
 * Deleting a folder moves the folder to the trash, where it can be restored later
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the folder and its
 * corresponding space. Permission to delete folders in the space.
 */
export async function deleteFolder(client: Client, parameters: DeleteFolder): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/folders/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
