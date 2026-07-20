import {
  SearchPageResponseSearchResultSchema,
  type SearchPageResponseSearchResult,
} from '../models/searchPageResponseSearchResult';
import type { SearchByCQL } from '../parameters/searchByCQL';
import type { SearchUser } from '../parameters/searchUser';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Searches for content using the [Confluence Query Language
 * (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
 *
 * **Note that CQL input queries submitted through the `/wiki/rest/api/search` endpoint no longer support user-specific
 * fields like `user`, `user.fullname`, `user.accountid`, and `user.userkey`.** See this [deprecation
 * notice](https://developer.atlassian.com/cloud/confluence/deprecation-notice-search-api/) for more details.
 *
 * Example initial call:
 *
 *     /wiki/rest/api/search?cql=type=page&limit=25
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
 *         "next": "/rest/api/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg",
 *         "self": "<url>"
 *       }
 *     }
 *
 * When additional results are available, returns `next` and `prev` URLs to retrieve them in subsequent calls. The URLs
 * each contain a cursor that points to the appropriate set of results. Use `limit` to specify the number of results
 * returned in each call.
 *
 * Example subsequent call (taken from example response):
 *
 *     /wiki/rest/api/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg
 *
 * The response to this will have a `prev` URL similar to the `next` in the example response.
 *
 * If the expand query parameter is used with the `body.export_view` and/or `body.styled_view` properties, then the
 * query limit parameter will be restricted to a maximum value of 25.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the entities. Note, only
 * entities that the user has permission to view will be returned.
 */
export async function searchByCQL(client: Client, parameters: SearchByCQL): Promise<SearchPageResponseSearchResult> {
  const config: SendRequestOptions<SearchPageResponseSearchResult> = {
    url: '/wiki/rest/api/search',
    method: 'GET',
    searchParams: {
      cql: parameters.cql,
      cqlcontext: parameters.cqlcontext,
      cursor: parameters.cursor,
      next: parameters.next,
      prev: parameters.prev,
      limit: parameters.limit,
      start: parameters.start,
      includeArchivedSpaces: parameters.includeArchivedSpaces,
      excludeCurrentSpaces: parameters.excludeCurrentSpaces,
      excerpt: parameters.excerpt,
      sitePermissionTypeFilter: parameters.sitePermissionTypeFilter,
      _: parameters._,
      expand: parameters.expand,
    },
    schema: SearchPageResponseSearchResultSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Searches for users using user-specific queries from the [Confluence Query Language
 * (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
 *
 * Note that CQL input queries submitted through the `/wiki/rest/api/search/user` endpoint only support user-specific
 * fields like `user`, `user.fullname`, `user.accountid`, and `user.userkey`.
 *
 * Note that some user fields may be set to null depending on the user's privacy settings. These are: email,
 * profilePicture, displayName, and timeZone.
 */
export async function searchUser(client: Client, parameters: SearchUser): Promise<SearchPageResponseSearchResult> {
  const config: SendRequestOptions<SearchPageResponseSearchResult> = {
    url: '/wiki/rest/api/search/user',
    method: 'GET',
    searchParams: {
      cql: parameters.cql,
      start: parameters.start,
      limit: parameters.limit,
      expand: parameters.expand,
      sitePermissionTypeFilter: parameters.sitePermissionTypeFilter,
    },
    schema: SearchPageResponseSearchResultSchema,
  };

  return await client.sendRequest(config);
}
