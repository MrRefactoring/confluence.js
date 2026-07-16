import type * as Models from './models/index.js';
import type * as Parameters from './parameters/index.js';
import type { Client } from '../clients/index.js';
import type { Callback } from '../callback.js';
import type { RequestConfig } from '../requestConfig.js';

export class Analytics {
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

    return this.client.sendRequest(config, callback);
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

    return this.client.sendRequest(config, callback);
  }
}
