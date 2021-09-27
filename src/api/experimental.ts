import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Experimental {
  constructor(private client: Client) {}

  /** Get the total number of views a piece of content has. */
  async getViews<T = Models.GetViews>(parameters: Parameters.GetViews, callback: Callback<T>): Promise<void>;
  /** Get the total number of views a piece of content has. */
  async getViews<T = Models.GetViews>(parameters: Parameters.GetViews, callback?: never): Promise<T>;
  async getViews<T = Models.GetViews>(parameters: Parameters.GetViews, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/analytics/content/${parameters.contentId}/views`,
      method: 'GET',
      params: {
        fromDate: parameters.fromDate,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getViews' });
  }

  /** Get the total number of distinct viewers a piece of content has. */
  async getViewers<T = Models.GetViewers>(parameters: Parameters.GetViewers, callback: Callback<T>): Promise<void>;
  /** Get the total number of distinct viewers a piece of content has. */
  async getViewers<T = Models.GetViewers>(parameters: Parameters.GetViewers, callback?: never): Promise<T>;
  async getViewers<T = Models.GetViewers>(
    parameters: Parameters.GetViewers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/analytics/content/${parameters.contentId}/viewers`,
      method: 'GET',
      params: {
        fromDate: parameters.fromDate,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getViewers' });
  }
}
