import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Children {
  constructor(private client: Client) {}

  /**
   * Returns all child pages for given page id. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only pages that the user has permission to view will be returned.
   */
  async getChildPages<T = Models.GetChildPages>(
    parameters: Parameters.GetChildPages,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all child pages for given page id. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only pages that the user has permission to view will be returned.
   */
  async getChildPages<T = Models.GetChildPages>(parameters: Parameters.GetChildPages, callback?: never): Promise<T>;
  async getChildPages<T = Models.GetChildPages>(
    parameters: Parameters.GetChildPages,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/children`,
      method: 'GET',
      params: {
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all child custom content for given custom content id. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only custom content that the user has permission to view will be returned.
   */
  async getChildCustomContent<T = Models.GetChildCustomContent>(
    parameters: Parameters.GetChildCustomContent,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all child custom content for given custom content id. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only custom content that the user has permission to view will be returned.
   */
  async getChildCustomContent<T = Models.GetChildCustomContent>(
    parameters: Parameters.GetChildCustomContent,
    callback?: never,
  ): Promise<T>;
  async getChildCustomContent<T = Models.GetChildCustomContent>(
    parameters: Parameters.GetChildCustomContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}/children`,
      method: 'GET',
      params: {
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
