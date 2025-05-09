import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class LongRunningTask {
  constructor(private client: Client) {}

  /**
   * Returns information about all active long-running tasks (e.g. space export), such as how long each task has been
   * running and the percentage of each task that has completed.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getTasks<T = Models.LongTaskStatusArray>(
    parameters: Parameters.GetTasks | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns information about all active long-running tasks (e.g. space export), such as how long each task has been
   * running and the percentage of each task that has completed.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getTasks<T = Models.LongTaskStatusArray>(parameters?: Parameters.GetTasks, callback?: never): Promise<T>;
  async getTasks<T = Models.LongTaskStatusArray>(
    parameters?: Parameters.GetTasks,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/longtask',
      method: 'GET',
      params: {
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns information about an active long-running task (e.g. space export), such as how long it has been running and
   * the percentage of the task that has completed.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getTask<T = Models.LongTaskStatusWithLinks>(
    parameters: Parameters.GetTask,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns information about an active long-running task (e.g. space export), such as how long it has been running and
   * the percentage of the task that has completed.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getTask<T = Models.LongTaskStatusWithLinks>(parameters: Parameters.GetTask, callback?: never): Promise<T>;
  async getTask<T = Models.LongTaskStatusWithLinks>(
    parameters: Parameters.GetTask,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/longtask/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
