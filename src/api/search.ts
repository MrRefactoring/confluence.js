import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Search {
  constructor(private client: Client) { }
  /**
     * Searches for content using the
     * [Confluence Query Language (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/)
     *
     * Example initial call:
     * ```
     * https://your-domain.atlassian.net/wiki/rest/api/search?cql=type=page&limit=25
     * ```
     *
     * Example response:
     * ```
     * {
     *   "results": [
     *     { ... },
     *     { ... },
     *     ...
     *     { ... }
     *   ],
     *   "limit": 25,
     *   "size": 25,
     *   ...
     *   "_links": {
     *     "base": "<url>",
     *     "context": "<url>",
     *     "next": "/rest/api/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg",
     *     "self": "<url>"
     *   }
     * }
     * ```
     *
     * When additional results are available, returns `next` and `prev` URLs to retrieve them in subsequent calls. The URLs each contain a cursor that points to the appropriate set of results. Use `limit` to specify the number of results returned in each call.
     *
     * Example subsequent call (taken from example response):
     * ```
     * https://your-domain.atlassian.net/wiki/rest/api/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg
     * ```
     * The response to this will have a `prev` URL similar to the `next` in the example response.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to view the entities. Note, only entities that the user has
     * permission to view will be returned. */
  async search<T = Models.SearchPageResponseSearchResult>(parameters: Parameters.Search, callback: Callback<T>): Promise<void>;
  /**
     * Searches for content using the
     * [Confluence Query Language (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/)
     *
     * Example initial call:
     * ```
     * https://your-domain.atlassian.net/wiki/rest/api/search?cql=type=page&limit=25
     * ```
     *
     * Example response:
     * ```
     * {
     *   "results": [
     *     { ... },
     *     { ... },
     *     ...
     *     { ... }
     *   ],
     *   "limit": 25,
     *   "size": 25,
     *   ...
     *   "_links": {
     *     "base": "<url>",
     *     "context": "<url>",
     *     "next": "/rest/api/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg",
     *     "self": "<url>"
     *   }
     * }
     * ```
     *
     * When additional results are available, returns `next` and `prev` URLs to retrieve them in subsequent calls. The URLs each contain a cursor that points to the appropriate set of results. Use `limit` to specify the number of results returned in each call.
     *
     * Example subsequent call (taken from example response):
     * ```
     * https://your-domain.atlassian.net/wiki/rest/api/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg
     * ```
     * The response to this will have a `prev` URL similar to the `next` in the example response.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to view the entities. Note, only entities that the user has
     * permission to view will be returned. */
  async search<T = Models.SearchPageResponseSearchResult>(parameters: Parameters.Search, callback?: never): Promise<T>;
  async search<T = Models.SearchPageResponseSearchResult>(parameters: Parameters.Search, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/search',
      method: 'GET',
      params: {
        cql: parameters.cql,
        cqlcontext: parameters.cqlcontext,
        cursor: parameters.cursor,
        limit: parameters.limit,
        includeArchivedSpaces: parameters.includeArchivedSpaces,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'search' });
  }
  /**
     * Searches for users using user-specific queries from the
     * [Confluence Query Language (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
     *
     * Note that some user fields may be set to null depending on the user's privacy settings.
     * These are: email, profilePicture, and displayName. */
  async userSearch<T = Models.SearchPageResponseSearchResult>(parameters: Parameters.UserSearch, callback: Callback<T>): Promise<void>;
  /**
     * Searches for users using user-specific queries from the
     * [Confluence Query Language (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
     *
     * Note that some user fields may be set to null depending on the user's privacy settings.
     * These are: email, profilePicture, and displayName. */
  async userSearch<T = Models.SearchPageResponseSearchResult>(parameters: Parameters.UserSearch, callback?: never): Promise<T>;
  async userSearch<T = Models.SearchPageResponseSearchResult>(parameters: Parameters.UserSearch, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/search/user',
      method: 'GET',
      params: {
        cql: parameters.cql,
        start: parameters.start,
        limit: parameters.limit,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'userSearch' });
  }
}
