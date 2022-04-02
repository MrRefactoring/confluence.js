import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { Pagination } from '../pagination';
import { RequestConfig } from '../requestConfig';

export class LongTask {
  constructor(private client: Client) {}

  /** Returns information about all tracked long-running tasks. */
  async getTasks<T = Pagination<Models.LongTaskStatus>>(
    parameters: Parameters.GetTasks | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns information about all tracked long-running tasks. */
  async getTasks<T = Pagination<Models.LongTaskStatus>>(parameters?: Parameters.GetTasks, callback?: never): Promise<T>;
  async getTasks<T = Pagination<Models.LongTaskStatus>>(
    parameters?: Parameters.GetTasks,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/longtask',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getTasks' });
  }

  /** Returns information about a long-running task. */
  async getTask<T = Models.LongTaskStatus>(parameters: Parameters.GetTask, callback: Callback<T>): Promise<void>;
  /** Returns information about a long-running task. */
  async getTask<T = Models.LongTaskStatus>(parameters: Parameters.GetTask, callback?: never): Promise<T>;
  async getTask<T = Models.LongTaskStatus>(parameters: Parameters.GetTask, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/longtask/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getTask' });
  }
}
