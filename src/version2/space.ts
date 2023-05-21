import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Space {
  constructor(private client: Client) {}

  /**
   * Returns all spaces. The results will be sorted by id ascending. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only spaces that the user has permission to view will be returned.
   */
  async getSpaces<T = Models.Pagination<Models.Space>>(
    parameters: Parameters.GetSpaces | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all spaces. The results will be sorted by id ascending. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only spaces that the user has permission to view will be returned.
   */
  async getSpaces<T = Models.Pagination<Models.Space>>(parameters?: Parameters.GetSpaces, callback?: never): Promise<T>;
  async getSpaces<T = Models.Pagination<Models.Space>>(
    parameters?: Parameters.GetSpaces,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/spaces',
      method: 'GET',
      params: {
        ids: parameters?.ids,
        keys: parameters?.keys,
        type: parameters?.type,
        status: parameters?.status,
        labels: parameters?.labels,
        sort: parameters?.sort,
        'description-format': parameters?.['description-format'],
        cursor: parameters?.cursor,
        limit: parameters?.limit,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a specific space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the space.
   */
  async getSpaceById<T = Models.Space>(parameters: Parameters.GetSpaceById, callback: Callback<T>): Promise<void>;
  /**
   * Returns a specific space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the space.
   */
  async getSpaceById<T = Models.Space>(parameters: Parameters.GetSpaceById, callback?: never): Promise<T>;
  async getSpaceById<T = Models.Space>(parameters: Parameters.GetSpaceById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.id}`,
      method: 'GET',
      params: {
        'description-format': parameters['description-format'],
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
