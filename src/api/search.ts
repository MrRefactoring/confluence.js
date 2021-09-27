import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Search {
  constructor(private client: Client) {}

  /** @deprecated Will be removed in the next major version. Use `searchByCQL` instead. */
  async search<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.Search,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated Will be removed in the next major version. Use `searchByCQL` instead. */
  async search<T = Models.SearchPageResponseSearchResult>(parameters: Parameters.Search, callback?: never): Promise<T>;
  async search<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.Search,
    callback?: Callback<T>,
  ): Promise<void | T> {
    return this.searchByCQL(parameters, callback!);
  }

  /**
   * Searches for content using the [Confluence Query Language
   * (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/)
   *
   * When additional results are available, returns `next` and `prev` URLs to retrieve them in subsequent calls. The
   * URLs each contain a cursor that points to the appropriate set of results. Use `limit` to specify the number of
   * results returned in each call.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the entities. Note, only
   * entities that the user has permission to view will be returned.
   */
  async searchByCQL<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.SearchByCQL,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Searches for content using the [Confluence Query Language
   * (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/)
   *
   * When additional results are available, returns `next` and `prev` URLs to retrieve them in subsequent calls. The
   * URLs each contain a cursor that points to the appropriate set of results. Use `limit` to specify the number of
   * results returned in each call.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the entities. Note, only
   * entities that the user has permission to view will be returned.
   */
  async searchByCQL<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.SearchByCQL,
    callback?: never
  ): Promise<T>;
  async searchByCQL<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.SearchByCQL,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/search',
      method: 'GET',
      params: {
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
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'searchByCQL' });
  }

  /** @deprecated Will be removed in the next major version. Use `searchUser` instead. */
  async userSearch<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.UserSearch,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated Will be removed in the next major version. Use `searchUser` instead. */
  async userSearch<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.UserSearch,
    callback?: never
  ): Promise<T>;
  async userSearch<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.UserSearch,
    callback?: Callback<T>,
  ): Promise<void | T> {
    return this.searchUser(parameters, callback!);
  }
  /**
   * Searches for users using user-specific queries from the [Confluence Query Language
   * (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
   *
   * Note that some user fields may be set to null depending on the user's privacy settings. These are: email,
   * profilePicture, and displayName.
   */
  async searchUser<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.SearchUser,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Searches for users using user-specific queries from the [Confluence Query Language
   * (CQL)](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
   *
   * Note that some user fields may be set to null depending on the user's privacy settings. These are: email,
   * profilePicture, and displayName.
   */
  async searchUser<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.SearchUser,
    callback?: never
  ): Promise<T>;
  async searchUser<T = Models.SearchPageResponseSearchResult>(
    parameters: Parameters.SearchUser,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/search/user',
      method: 'GET',
      params: {
        cql: parameters.cql,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'searchUser' });
  }
}
