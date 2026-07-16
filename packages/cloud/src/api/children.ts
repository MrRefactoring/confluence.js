import { WhiteboardDirectChildrenSchema, type WhiteboardDirectChildren } from '#/models/whiteboardDirectChildren';
import { DatabaseDirectChildrenSchema, type DatabaseDirectChildren } from '#/models/databaseDirectChildren';
import { SmartLinkDirectChildrenSchema, type SmartLinkDirectChildren } from '#/models/smartLinkDirectChildren';
import { FolderDirectChildrenSchema, type FolderDirectChildren } from '#/models/folderDirectChildren';
import { ChildPagesSchema, type ChildPages } from '#/models/childPages';
import { ChildCustomContentGetSchema, type ChildCustomContentGet } from '#/models/childCustomContentGet';
import { PageDirectChildrenSchema, type PageDirectChildren } from '#/models/pageDirectChildren';
import type { GetWhiteboardDirectChildren } from '#/parameters/getWhiteboardDirectChildren';
import type { GetDatabaseDirectChildren } from '#/parameters/getDatabaseDirectChildren';
import type { GetSmartLinkDirectChildren } from '#/parameters/getSmartLinkDirectChildren';
import type { GetFolderDirectChildren } from '#/parameters/getFolderDirectChildren';
import type { GetChildPages } from '#/parameters/getChildPages';
import type { GetChildCustomContent } from '#/parameters/getChildCustomContent';
import type { GetPageDirectChildren } from '#/parameters/getPageDirectChildren';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Returns all children for given whiteboard id in the content tree. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each child. To fetch more details, use a related endpoint based on
 * the content type, such as:
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
 * use' global permission). Only content that the user has permission to view will be returned.
 */
export async function getWhiteboardDirectChildren(
  client: Client,
  parameters: GetWhiteboardDirectChildren,
): Promise<WhiteboardDirectChildren> {
  const config: SendRequestOptions<WhiteboardDirectChildren> = {
    url: `/whiteboards/${parameters.id}/direct-children`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: WhiteboardDirectChildrenSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all children for given database id in the content tree. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each child. To fetch more details, use a related endpoint based on
 * the content type, such as:
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
 * use' global permission). Only content that the user has permission to view will be returned.
 */
export async function getDatabaseDirectChildren(
  client: Client,
  parameters: GetDatabaseDirectChildren,
): Promise<DatabaseDirectChildren> {
  const config: SendRequestOptions<DatabaseDirectChildren> = {
    url: `/databases/${parameters.id}/direct-children`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: DatabaseDirectChildrenSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all children for given smart link id in the content tree. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each child. To fetch more details, use a related endpoint based on
 * the content type, such as:
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
 * use' global permission). Only content that the user has permission to view will be returned.
 */
export async function getSmartLinkDirectChildren(
  client: Client,
  parameters: GetSmartLinkDirectChildren,
): Promise<SmartLinkDirectChildren> {
  const config: SendRequestOptions<SmartLinkDirectChildren> = {
    url: `/embeds/${parameters.id}/direct-children`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: SmartLinkDirectChildrenSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all children for given folder id in the content tree. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each child. To fetch more details, use a related endpoint based on
 * the content type, such as:
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
 * use' global permission). Only content that the user has permission to view will be returned.
 */
export async function getFolderDirectChildren(
  client: Client,
  parameters: GetFolderDirectChildren,
): Promise<FolderDirectChildren> {
  const config: SendRequestOptions<FolderDirectChildren> = {
    url: `/folders/${parameters.id}/direct-children`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: FolderDirectChildrenSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all child pages for given page id. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only pages that the user has permission to view will be returned.
 */
export async function getChildPages(client: Client, parameters: GetChildPages): Promise<ChildPages> {
  const config: SendRequestOptions<ChildPages> = {
    url: `/pages/${parameters.id}/children`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: ChildPagesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all child custom content for given custom content id. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only custom content that the user has permission to view will be returned.
 */
export async function getChildCustomContent(
  client: Client,
  parameters: GetChildCustomContent,
): Promise<ChildCustomContentGet> {
  const config: SendRequestOptions<ChildCustomContentGet> = {
    url: `/custom-content/${parameters.id}/children`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: ChildCustomContentGetSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all children for given page id in the content tree. The number of results is limited by the `limit` parameter
 * and additional results (if available) will be available through the `next` URL present in the `Link` response
 * header.
 *
 * The following types of content will be returned:
 *
 * - Database
 * - Embed
 * - Folder
 * - Page
 * - Whiteboard
 *
 * This endpoint returns minimal information about each child. To fetch more details, use a related endpoint based on
 * the content type, such as:
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
 * use' global permission). Only content that the user has permission to view will be returned.
 */
export async function getPageDirectChildren(
  client: Client,
  parameters: GetPageDirectChildren,
): Promise<PageDirectChildren> {
  const config: SendRequestOptions<PageDirectChildren> = {
    url: `/pages/${parameters.id}/direct-children`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      limit: parameters.limit,
      sort: parameters.sort,
    },
    schema: PageDirectChildrenSchema,
  };

  return await client.sendRequest(config);
}
