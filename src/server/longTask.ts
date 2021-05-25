import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class LongTask {
  constructor(private client: Client) {}

  /** Returns information about all tracked long-running tasks. */
  async getTasks<T = unknown>(parameters: Parameters.GetTasks | undefined, callback: Callback<T>): Promise<void>;
  /** Returns information about all tracked long-running tasks. */
  async getTasks<T = unknown>(parameters?: Parameters.GetTasks, callback?: never): Promise<T>;
  async getTasks<T = unknown>(parameters?: Parameters.GetTasks, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/longtask',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getTasks' });
  }

  /** Returns information about a long-running task. */
  async getTask<T = unknown>(parameters: Parameters.GetTask | undefined, callback: Callback<T>): Promise<void>;
  /** Returns information about a long-running task. */
  async getTask<T = unknown>(parameters?: Parameters.GetTask, callback?: never): Promise<T>;
  async getTask<T = unknown>(parameters?: Parameters.GetTask, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/longtask/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getTask' });
  }
}
