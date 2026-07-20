import { WhiteboardDescendantsSchema, type WhiteboardDescendants } from '../models/whiteboardDescendants';
import { DatabaseDescendantsSchema, type DatabaseDescendants } from '../models/databaseDescendants';
import { SmartLinkDescendantsSchema, type SmartLinkDescendants } from '../models/smartLinkDescendants';
import { FolderDescendantsSchema, type FolderDescendants } from '../models/folderDescendants';
import { PageDescendantsSchema, type PageDescendants } from '../models/pageDescendants';
import type { GetWhiteboardDescendants } from '../parameters/getWhiteboardDescendants';
import type { GetDatabaseDescendants } from '../parameters/getDatabaseDescendants';
import type { GetSmartLinkDescendants } from '../parameters/getSmartLinkDescendants';
import type { GetFolderDescendants } from '../parameters/getFolderDescendants';
import type { GetPageDescendants } from '../parameters/getPageDescendants';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns descendants in the content tree for a given whiteboard by ID in top-to-bottom order (that is, the highest
 * descendant is the first item in the response payload). The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available by calling this endpoint with the cursor in the response payload.
 * There is also a `depth` parameter specifying depth of descendants to be fetched.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each descendant. To fetch more details, use a related endpoint based
 * on the content type, such as:
 *
 * - [Get database by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-database/#api-databases-id-get)
 * - [Get embed by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-smart-link/#api-embeds-id-get)
 * - [Get folder by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-folder/#api-folders-id-get)
 * - [Get page by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-page/#api-pages-id-get)
 * - [Get whiteboard by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-whiteboard/#api-whiteboards-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the whiteboard and its corresponding space
 */
export async function getWhiteboardDescendants(
  client: Client,
  parameters: GetWhiteboardDescendants,
): Promise<WhiteboardDescendants> {
  const config: SendRequestOptions<WhiteboardDescendants> = {
    url: `/wiki/api/v2/whiteboards/${parameters.id}/descendants`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
      depth: parameters.depth,
      cursor: parameters.cursor,
    },
    schema: WhiteboardDescendantsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns descendants in the content tree for a given database by ID in top-to-bottom order (that is, the highest
 * descendant is the first item in the response payload). The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available by calling this endpoint with the cursor in the response payload.
 * There is also a `depth` parameter specifying depth of descendants to be fetched.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each descendant. To fetch more details, use a related endpoint based
 * on the content type, such as:
 *
 * - [Get database by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-database/#api-databases-id-get)
 * - [Get embed by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-smart-link/#api-embeds-id-get)
 * - [Get folder by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-folder/#api-folders-id-get)
 * - [Get page by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-page/#api-pages-id-get)
 * - [Get whiteboard by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-whiteboard/#api-whiteboards-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the database and its corresponding space
 */
export async function getDatabaseDescendants(
  client: Client,
  parameters: GetDatabaseDescendants,
): Promise<DatabaseDescendants> {
  const config: SendRequestOptions<DatabaseDescendants> = {
    url: `/wiki/api/v2/databases/${parameters.id}/descendants`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
      depth: parameters.depth,
      cursor: parameters.cursor,
    },
    schema: DatabaseDescendantsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns descendants in the content tree for a given smart link by ID in top-to-bottom order (that is, the highest
 * descendant is the first item in the response payload). The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available by calling this endpoint with the cursor in the response payload.
 * There is also a `depth` parameter specifying depth of descendants to be fetched.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each descendant. To fetch more details, use a related endpoint based
 * on the content type, such as:
 *
 * - [Get database by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-database/#api-databases-id-get)
 * - [Get embed by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-smart-link/#api-embeds-id-get)
 * - [Get folder by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-folder/#api-folders-id-get)
 * - [Get page by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-page/#api-pages-id-get)
 * - [Get whiteboard by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-whiteboard/#api-whiteboards-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the smart link and its corresponding space
 */
export async function getSmartLinkDescendants(
  client: Client,
  parameters: GetSmartLinkDescendants,
): Promise<SmartLinkDescendants> {
  const config: SendRequestOptions<SmartLinkDescendants> = {
    url: `/wiki/api/v2/embeds/${parameters.id}/descendants`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
      depth: parameters.depth,
      cursor: parameters.cursor,
    },
    schema: SmartLinkDescendantsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns descendants in the content tree for a given folder by ID in top-to-bottom order (that is, the highest
 * descendant is the first item in the response payload). The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available by calling this endpoint with the cursor in the response payload.
 * There is also a `depth` parameter specifying depth of descendants to be fetched.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each descendant. To fetch more details, use a related endpoint based
 * on the content type, such as:
 *
 * - [Get database by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-database/#api-databases-id-get)
 * - [Get embed by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-smart-link/#api-embeds-id-get)
 * - [Get folder by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-folder/#api-folders-id-get)
 * - [Get page by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-page/#api-pages-id-get)
 * - [Get whiteboard by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-whiteboard/#api-whiteboards-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the and its corresponding space
 */
export async function getFolderDescendants(
  client: Client,
  parameters: GetFolderDescendants,
): Promise<FolderDescendants> {
  const config: SendRequestOptions<FolderDescendants> = {
    url: `/wiki/api/v2/folders/${parameters.id}/descendants`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
      depth: parameters.depth,
      cursor: parameters.cursor,
    },
    schema: FolderDescendantsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns descendants in the content tree for a given page by ID in top-to-bottom order (that is, the highest
 * descendant is the first item in the response payload). The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available by calling this endpoint with the cursor in the response payload.
 * There is also a `depth` parameter specifying depth of descendants to be fetched.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each descendant. To fetch more details, use a related endpoint based
 * on the content type, such as:
 *
 * - [Get database by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-database/#api-databases-id-get)
 * - [Get embed by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-smart-link/#api-embeds-id-get)
 * - [Get folder by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-folder/#api-folders-id-get)
 * - [Get page by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-page/#api-pages-id-get)
 * - [Get whiteboard by
 *   id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-whiteboard/#api-whiteboards-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the page and its corresponding space
 */
export async function getPageDescendants(client: Client, parameters: GetPageDescendants): Promise<PageDescendants> {
  const config: SendRequestOptions<PageDescendants> = {
    url: `/wiki/api/v2/pages/${parameters.id}/descendants`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
      depth: parameters.depth,
      cursor: parameters.cursor,
    },
    schema: PageDescendantsSchema,
  };

  return await client.sendRequest(config);
}
