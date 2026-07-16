import { DatabaseSchema, type Database } from '#/models/database';
import type { CreateDatabase } from '#/parameters/createDatabase';
import type { GetDatabaseById } from '#/parameters/getDatabaseById';
import type { DeleteDatabase } from '#/parameters/deleteDatabase';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Creates a database in the space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the corresponding space.
 * Permission to create a database in the space.
 */
export async function createDatabase(client: Client, parameters: CreateDatabase): Promise<Database> {
  const config: SendRequestOptions<Database> = {
    url: '/databases',
    method: 'POST',
    searchParams: {
      private: parameters.private,
    },
    body: parameters.body,
    schema: DatabaseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific database.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the database and its
 * corresponding space.
 */
export async function getDatabaseById(client: Client, parameters: GetDatabaseById): Promise<Database> {
  const config: SendRequestOptions<Database> = {
    url: `/databases/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'include-collaborators': parameters.includeCollaborators,
      'include-direct-children': parameters.includeDirectChildren,
      'include-operations': parameters.includeOperations,
      'include-properties': parameters.includeProperties,
    },
    schema: DatabaseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a database by id.
 *
 * Deleting a database moves the database to the trash, where it can be restored later
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the database and its
 * corresponding space. Permission to delete databases in the space.
 */
export async function deleteDatabase(client: Client, parameters: DeleteDatabase): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/databases/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
