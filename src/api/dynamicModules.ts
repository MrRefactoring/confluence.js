import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class DynamicModules {
  constructor(private client: Client) {}

  /**
   * Returns all modules registered dynamically by the calling app.
   *
   * **[Permissions](#permissions) required:** Only Connect apps can make this request.
   */
  async getModules<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all modules registered dynamically by the calling app.
   *
   * **[Permissions](#permissions) required:** Only Connect apps can make this request.
   */
  async getModules<T = unknown>(callback?: never): Promise<T>;
  async getModules<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/atlassian-connect/1/app/module/dynamic',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'getModules' });
  }

  /**
   * Registers a list of modules. For the list of modules that support dynamic registration, see [Dynamic
   * modules](https://developer.atlassian.com/cloud/confluence/dynamic-modules/).
   *
   * **[Permissions](#permissions) required:** Only Connect apps can make this request.
   */
  async registerModules<T = unknown>(
    parameters: Parameters.RegisterModules | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Registers a list of modules. For the list of modules that support dynamic registration, see [Dynamic
   * modules](https://developer.atlassian.com/cloud/confluence/dynamic-modules/).
   *
   * **[Permissions](#permissions) required:** Only Connect apps can make this request.
   */
  async registerModules<T = unknown>(parameters?: Parameters.RegisterModules, callback?: never): Promise<T>;
  async registerModules<T = unknown>(
    parameters?: Parameters.RegisterModules,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/atlassian-connect/1/app/module/dynamic',
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'registerModules' });
  }

  /**
   * Remove all or a list of modules registered by the calling app.
   *
   * **[Permissions](#permissions) required:** Only Connect apps can make this request.
   */
  async removeModules<T = void>(parameters: Parameters.RemoveModules, callback: Callback<T>): Promise<void>;
  /**
   * Remove all or a list of modules registered by the calling app.
   *
   * **[Permissions](#permissions) required:** Only Connect apps can make this request.
   */
  async removeModules<T = void>(parameters: Parameters.RemoveModules, callback?: never): Promise<T>;
  async removeModules<T = void>(parameters: Parameters.RemoveModules, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/atlassian-connect/1/app/module/dynamic',
      method: 'DELETE',
      params: {
        moduleKey: parameters.moduleKey,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'removeModules' });
  }
}
