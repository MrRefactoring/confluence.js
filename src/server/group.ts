import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { Pagination } from '../pagination';
import { RequestConfig } from '../requestConfig';

export class Group {
  constructor(private client: Client) {}

  /** Get a paginated collection of user groups */
  async getGroups<T = Pagination<Models.Group>>(
    parameters: Parameters.GetGroups | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /** Get a paginated collection of user groups */
  async getGroups<T = Pagination<Models.Group>>(parameters?: Parameters.GetGroups, callback?: never): Promise<T>;
  async getGroups<T = Pagination<Models.Group>>(
    parameters?: Parameters.GetGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/group',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get the user group with the group name */
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback: Callback<T>): Promise<void>;
  /** Get the user group with the group name */
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback?: never): Promise<T>;
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/group/${parameters.groupName}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get a paginated collection of users in the given group */
  async getMembers<T = Pagination<Models.User>>(
    parameters: Parameters.GetMembers,
    callback: Callback<T>,
  ): Promise<void>;
  /** Get a paginated collection of users in the given group */
  async getMembers<T = Pagination<Models.User>>(parameters: Parameters.GetMembers, callback?: never): Promise<T>;
  async getMembers<T = Pagination<Models.User>>(
    parameters: Parameters.GetMembers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/group/${parameters.groupName}/member`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
