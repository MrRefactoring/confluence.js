import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Search {
  constructor(private client: Client) {}

  /**
   * Search for entities in Confluence using the Confluence Query Language (CQL)
   *
   * @example
   *   For example :
   *
   *
   *   Example request URI(s):
   *
   *   - http://localhost:8080/confluence/rest/api/search?cql=creator=currentUser()&type%20in%20(space,page,user)&cqlcontext={%22spaceKey%22:%22TST%22,
   *   %22contentId%22:%2255%22}
   *   - http://localhost:8080/confluence/rest/api/search?cql=siteSearch~'example'%20AND%20label=docs&expand=content.space,space.homepage&limit=10
   */
  async search<T = unknown>(parameters: Parameters.SearchContent | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Search for entities in Confluence using the Confluence Query Language (CQL)
   *
   * @example
   *   For example :
   *
   *   Example request URI(s):
   *
   *   http://localhost:8080/confluence/rest/api/search?cql=creator=currentUser()&type%20in%20(space,page,user)&cqlcontext={%22spaceKey%22:%22TST%22,
   *   %22contentId%22:%2255%22}
   *   http://localhost:8080/confluence/rest/api/search?cql=siteSearch~'example'%20AND%20label=docs&expand=content.space,space.homepage&limit=10
   */
  async search<T = unknown>(parameters?: Parameters.SearchContent, callback?: never): Promise<T>;
  async search<T = unknown>(parameters?: Parameters.SearchContent, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/search',
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

    return this.client.sendRequest(config, callback, { methodName: 'server.search' });
  }
}
