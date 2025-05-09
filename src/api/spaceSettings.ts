import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class SpaceSettings {
  constructor(private client: Client) {}

  /**
   * Returns the settings of a space. Currently only the `routeOverrideEnabled` setting can be returned.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space.
   */
  async getSpaceSettings<T = Models.SpaceSettings>(
    parameters: Parameters.GetSpaceSettings,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the settings of a space. Currently only the `routeOverrideEnabled` setting can be returned.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space.
   */
  async getSpaceSettings<T = Models.SpaceSettings>(
    parameters: Parameters.GetSpaceSettings,
    callback?: never,
  ): Promise<T>;
  async getSpaceSettings<T = Models.SpaceSettings>(
    parameters: Parameters.GetSpaceSettings,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/settings`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the settings for a space. Currently only the `routeOverrideEnabled` setting can be updated.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async updateSpaceSettings<T = Models.SpaceSettings>(
    parameters: Parameters.UpdateSpaceSettings,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the settings for a space. Currently only the `routeOverrideEnabled` setting can be updated.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async updateSpaceSettings<T = Models.SpaceSettings>(
    parameters: Parameters.UpdateSpaceSettings,
    callback?: never,
  ): Promise<T>;
  async updateSpaceSettings<T = Models.SpaceSettings>(
    parameters: Parameters.UpdateSpaceSettings,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/settings`,
      method: 'PUT',
      data: {
        routeOverrideEnabled: parameters.routeOverrideEnabled,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
