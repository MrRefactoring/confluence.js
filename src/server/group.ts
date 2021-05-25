import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Group {
  constructor(private client: Client) {}

  /** Get a paginated collection of user groups */
  async getGroups<T = unknown>(parameters: Parameters.GetGroups | undefined, callback: Callback<T>): Promise<void>;
  /** Get a paginated collection of user groups */
  async getGroups<T = unknown>(parameters?: Parameters.GetGroups, callback?: never): Promise<T>;
  async getGroups<T = unknown>(parameters?: Parameters.GetGroups, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/group',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getGroups' });
  }

  /** Get the user group with the group name */
  async getGroup<T = unknown>(parameters: Parameters.GetGroup | undefined, callback: Callback<T>): Promise<void>;
  /** Get the user group with the group name */
  async getGroup<T = unknown>(parameters?: Parameters.GetGroup, callback?: never): Promise<T>;
  async getGroup<T = unknown>(parameters?: Parameters.GetGroup, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/group/${parameters.groupName}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getGroup' });
  }

  /** Get a paginated collection of users in the given group */
  async getMembers<T = unknown>(parameters: Parameters.GetMembers | undefined, callback: Callback<T>): Promise<void>;
  /** Get a paginated collection of users in the given group */
  async getMembers<T = unknown>(parameters?: Parameters.GetMembers, callback?: never): Promise<T>;
  async getMembers<T = unknown>(parameters?: Parameters.GetMembers, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/group/${parameters.groupName}/member`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getMembers' });
  }
}
