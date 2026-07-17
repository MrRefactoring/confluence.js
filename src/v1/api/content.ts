import { LongTaskSchema, type LongTask } from '../models/longTask';
import { ContentSchema, type Content } from '../models/content';
import { ContentArraySchema, type ContentArray } from '../models/contentArray';
import type { ArchivePages } from '../parameters/archivePages';
import type { PublishLegacyDraft } from '../parameters/publishLegacyDraft';
import type { PublishSharedDraft } from '../parameters/publishSharedDraft';
import type { SearchContentByCQL } from '../parameters/searchContentByCQL';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Archives a list of pages. The pages to be archived are specified as a list of content IDs. This API accepts the
 * archival request and returns a task ID. The archival process happens asynchronously. Use the /longtask/<taskId> REST
 * API to get the copy task status.
 *
 * Each content ID needs to resolve to page objects that are not already in an archived state. The content IDs need not
 * belong to the same space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Archive' permission for each of the pages in
 * the corresponding space it belongs to.
 */
export async function archivePages(client: Client, parameters: ArchivePages): Promise<LongTask> {
  const config: SendRequestOptions<LongTask> = {
    url: '/wiki/rest/api/content/archive',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      pages: parameters.pages,
    },
    schema: LongTaskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Publishes a legacy draft of a page created from a blueprint. Legacy drafts will eventually be removed in favor of
 * shared drafts. For now, this method works the same as [Publish shared
 * draft](#api-content-blueprint-instance-draftId-put).
 *
 * By default, the following objects are expanded: `body.storage`, `history`, `space`, `version`, `ancestors`.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the draft and 'Add'
 * permission for the space that the content will be created in.
 */
export async function publishLegacyDraft(client: Client, parameters: PublishLegacyDraft): Promise<Content> {
  const config: SendRequestOptions<Content> = {
    url: `/wiki/rest/api/content/blueprint/instance/${parameters.draftId}`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      status: parameters.status,
      expand: parameters.expand,
    },
    body: {
      version: parameters.version,
      title: parameters.title,
      type: parameters.type,
      status: parameters.status,
      space: parameters.space,
      ancestors: parameters.ancestors,
    },
    schema: ContentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Publishes a shared draft of a page created from a blueprint.
 *
 * By default, the following objects are expanded: `body.storage`, `history`, `space`, `version`, `ancestors`.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the draft and 'Add'
 * permission for the space that the content will be created in.
 */
export async function publishSharedDraft(client: Client, parameters: PublishSharedDraft): Promise<Content> {
  const config: SendRequestOptions<Content> = {
    url: `/wiki/rest/api/content/blueprint/instance/${parameters.draftId}`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      status: parameters.status,
      expand: parameters.expand,
    },
    body: {
      version: parameters.version,
      title: parameters.title,
      type: parameters.type,
      status: parameters.status,
      space: parameters.space,
      ancestors: parameters.ancestors,
    },
    schema: ContentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the list of content that matches a Confluence Query Language (CQL) query. For information on CQL, see:
 * [Advanced searching using CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
 *
 * Example initial call:
 *
 *     /wiki/rest/api/content/search?cql=type=page&limit=25
 *
 * Example response:
 *
 *     {
 *       "results": [
 *         { ... },
 *         { ... },
 *         ...
 *         { ... }
 *       ],
 *       "limit": 25,
 *       "size": 25,
 *       ...
 *       "_links": {
 *         "base": "<url>",
 *         "context": "<url>",
 *         "next": "/rest/api/content/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg",
 *         "self": "<url>"
 *       }
 *     }
 *
 * When additional results are available, returns `next` and `prev` URLs to retrieve them in subsequent calls. The URLs
 * each contain a cursor that points to the appropriate set of results. Use `limit` to specify the number of results
 * returned in each call. Example subsequent call (taken from example response):
 *
 *     /wiki/rest/api/content/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg
 *
 * The response to this will have a `prev` URL similar to the `next` in the example response.
 *
 * If the expand query parameter is used with the `body.export_view` and/or `body.styled_view` properties, then the
 * query limit parameter will be restricted to a maximum value of 25.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only content that the user has permission to view will be returned.
 */
export async function searchContentByCQL(client: Client, parameters: SearchContentByCQL): Promise<ContentArray> {
  const config: SendRequestOptions<ContentArray> = {
    url: '/wiki/rest/api/content/search',
    method: 'GET',
    searchParams: {
      cql: parameters.cql,
      cqlcontext: parameters.cqlcontext,
      expand: parameters.expand,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: ContentArraySchema,
  };

  return await client.sendRequest(config);
}
