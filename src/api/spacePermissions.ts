import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class SpacePermissions {
  constructor(private client: Client) { }
  /**
     * Adds new permission to space.
     *
     * If the permission to be added is a group permission, the group can be identified
     * by its group name or group id.
     *
     * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Admin' permission for the space. */
  async addPermission<T = Models.SpacePermissionV2>(parameters: Parameters.AddPermission, callback: Callback<T>): Promise<void>;
  /**
     * Adds new permission to space.
     *
     * If the permission to be added is a group permission, the group can be identified
     * by its group name or group id.
     *
     * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Admin' permission for the space. */
  async addPermission<T = Models.SpacePermissionV2>(parameters: Parameters.AddPermission, callback?: never): Promise<T>;
  async addPermission<T = Models.SpacePermissionV2>(parameters: Parameters.AddPermission, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/permission`,
      method: 'POST',
      data: {
        id: parameters.id,
        subject: parameters.subject,
        operation: parameters.operation,
        _links: parameters._links,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'addPermission' });
  }
  /**
     * Removes a space permission. Note that removing Read Space permission for a user or group will remove all
     * the space permissions for that user or group.
     *
     * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Admin' permission for the space. */
  async removePermission<T = void>(parameters: Parameters.RemovePermission, callback: Callback<T>): Promise<void>;
  /**
     * Removes a space permission. Note that removing Read Space permission for a user or group will remove all
     * the space permissions for that user or group.
     *
     * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Admin' permission for the space. */
  async removePermission<T = void>(parameters: Parameters.RemovePermission, callback?: never): Promise<T>;
  async removePermission<T = void>(parameters: Parameters.RemovePermission, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/permission/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'removePermission' });
  }
}
