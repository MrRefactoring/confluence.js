import { WhiteboardAncestorsSchema, type WhiteboardAncestors } from '#/models/whiteboardAncestors';
import { DatabaseAncestorsSchema, type DatabaseAncestors } from '#/models/databaseAncestors';
import { SmartLinkAncestorsSchema, type SmartLinkAncestors } from '#/models/smartLinkAncestors';
import { FolderAncestorsSchema, type FolderAncestors } from '#/models/folderAncestors';
import { PageAncestorsSchema, type PageAncestors } from '#/models/pageAncestors';
import type { GetWhiteboardAncestors } from '#/parameters/getWhiteboardAncestors';
import type { GetDatabaseAncestors } from '#/parameters/getDatabaseAncestors';
import type { GetSmartLinkAncestors } from '#/parameters/getSmartLinkAncestors';
import type { GetFolderAncestors } from '#/parameters/getFolderAncestors';
import type { GetPageAncestors } from '#/parameters/getPageAncestors';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Returns all ancestors for a given whiteboard by ID in top-to-bottom order (that is, the highest ancestor is the first
 * item in the response payload). The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available by calling this endpoint with the ID of first ancestor in the response payload.
 *
 * This endpoint returns minimal information about each ancestor. To fetch more details, use a related endpoint, such as
 * [Get whiteboard by
 * id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-whiteboard/#api-whiteboards-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the whiteboard and its corresponding space
 */
export async function getWhiteboardAncestors(
  client: Client,
  parameters: GetWhiteboardAncestors,
): Promise<WhiteboardAncestors> {
  const config: SendRequestOptions<WhiteboardAncestors> = {
    url: `/whiteboards/${parameters.id}/ancestors`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
    },
    schema: WhiteboardAncestorsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all ancestors for a given database by ID in top-to-bottom order (that is, the highest ancestor is the first
 * item in the response payload). The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available by calling this endpoint with the ID of first ancestor in the response payload.
 *
 * This endpoint returns minimal information about each ancestor. To fetch more details, use a related endpoint, such as
 * [Get database by
 * id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-database/#api-databases-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the database and its corresponding space
 */
export async function getDatabaseAncestors(
  client: Client,
  parameters: GetDatabaseAncestors,
): Promise<DatabaseAncestors> {
  const config: SendRequestOptions<DatabaseAncestors> = {
    url: `/databases/${parameters.id}/ancestors`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
    },
    schema: DatabaseAncestorsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all ancestors for a given Smart Link in the content tree by ID in top-to-bottom order (that is, the highest
 * ancestor is the first item in the response payload). The number of results is limited by the `limit` parameter and
 * additional results (if available) will be available by calling this endpoint with the ID of first ancestor in the
 * response payload.
 *
 * This endpoint returns minimal information about each ancestor. To fetch more details, use a related endpoint, such as
 * [Get Smart Link in the content tree by
 * id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-smart-link/#api-embeds-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the Smart Link in the content tree and its corresponding space
 */
export async function getSmartLinkAncestors(
  client: Client,
  parameters: GetSmartLinkAncestors,
): Promise<SmartLinkAncestors> {
  const config: SendRequestOptions<SmartLinkAncestors> = {
    url: `/embeds/${parameters.id}/ancestors`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
    },
    schema: SmartLinkAncestorsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all ancestors for a given folder by ID in top-to-bottom order (that is, the highest ancestor is the first
 * item in the response payload). The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available by calling this endpoint with the ID of first ancestor in the response payload.
 *
 * This endpoint returns minimal information about each ancestor. To fetch more details, use a related endpoint, such as
 * [Get folder by
 * id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-smart-link/#api-folders-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Permission to view the folder and its corresponding space
 */
export async function getFolderAncestors(client: Client, parameters: GetFolderAncestors): Promise<FolderAncestors> {
  const config: SendRequestOptions<FolderAncestors> = {
    url: `/folders/${parameters.id}/ancestors`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
    },
    schema: FolderAncestorsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all ancestors for a given page by ID in top-to-bottom order (that is, the highest ancestor is the first item
 * in the response payload). The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available by calling this endpoint with the ID of first ancestor in the response payload.
 *
 * This endpoint returns minimal information about each ancestor. To fetch more details, use a related endpoint, such as
 * [Get page by id](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-page/#api-pages-id-get).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getPageAncestors(client: Client, parameters: GetPageAncestors): Promise<PageAncestors> {
  const config: SendRequestOptions<PageAncestors> = {
    url: `/pages/${parameters.id}/ancestors`,
    method: 'GET',
    searchParams: {
      limit: parameters.limit,
    },
    schema: PageAncestorsSchema,
  };

  return await client.sendRequest(config);
}
