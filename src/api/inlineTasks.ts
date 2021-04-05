import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class InlineTasks {
  constructor(private client: Client) { }
  /**
     * Returns inline tasks based on the search query.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). Only tasks
     * in contents that the user has permission to view are returned. */
  async searchTasks<T = Models.TaskPageResponse>(parameters: Parameters.SearchTasks | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns inline tasks based on the search query.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). Only tasks
     * in contents that the user has permission to view are returned. */
  async searchTasks<T = Models.TaskPageResponse>(parameters?: Parameters.SearchTasks, callback?: never): Promise<T>;
  async searchTasks<T = Models.TaskPageResponse>(parameters?: Parameters.SearchTasks, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/inlinetasks/search',
      method: 'GET',
      params: {
        start: parameters?.start,
        limit: parameters?.limit,
        spaceKey: parameters?.spaceKey,
        pageId: parameters?.pageId,
        assignee: parameters?.assignee,
        creator: parameters?.creator,
        completedUser: parameters?.completedUser,
        duedateFrom: parameters?.duedateFrom,
        duedateTo: parameters?.duedateTo,
        createdateFrom: parameters?.createdateFrom,
        createdateTo: parameters?.createdateTo,
        completedateFrom: parameters?.completedateFrom,
        completedateTo: parameters?.completedateTo,
        status: parameters?.status,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'searchTasks' });
  }
}
