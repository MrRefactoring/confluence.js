import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { Pagination } from '../pagination';
import { RequestConfig } from '../requestConfig';

export class Search {
  constructor(private client: Client) {}

  /** Search for entities in Confluence using the Confluence Query Language (CQL) */
  async search<T = Pagination<Models.SearchResult>>(
    parameters: Parameters.SearchContent | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /** Search for entities in Confluence using the Confluence Query Language (CQL) */
  async search<T = Pagination<Models.SearchResult>>(
    parameters?: Parameters.SearchContent,
    callback?: never,
  ): Promise<T>;
  async search<T = Pagination<Models.SearchResult>>(
    parameters?: Parameters.SearchContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/search',
      method: 'GET',
      params: {
        cql: parameters?.cql,
        cqlcontext: parameters?.cqlcontext,
        excerpt: parameters?.excerpt,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
        includeArchivedSpaces: parameters?.includeArchivedSpaces,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
