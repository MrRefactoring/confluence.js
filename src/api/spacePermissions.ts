import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class SpacePermissions {
  constructor(private client: Client) {}

  /** @deprecated Will be removed in the next major version. Use `addPermissionToSpace` instead. */
  async addPermission<T = Models.SpacePermissionV2>(
    parameters: Parameters.AddPermission,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated Will be removed in the next major version. Use `addPermissionToSpace` instead. */
  async addPermission<T = Models.SpacePermissionV2>(parameters: Parameters.AddPermission, callback?: never): Promise<T>;
  async addPermission<T = Models.SpacePermissionV2>(
    parameters: Parameters.AddPermission,
    callback?: Callback<T>,
  ): Promise<void | T> {
    return this.addPermissionToSpace(parameters, callback!);
  }

  /**
   * Adds new permission to space.
   *
   * If the permission to be added is a group permission, the group can be identified by its group name or group id.
   *
   * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async addPermissionToSpace<T = Models.SpacePermissionV2>(
    parameters: Parameters.AddPermissionToSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Adds new permission to space.
   *
   * If the permission to be added is a group permission, the group can be identified by its group name or group id.
   *
   * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async addPermissionToSpace<T = Models.SpacePermissionV2>(
    parameters: Parameters.AddPermissionToSpace,
    callback?: never
  ): Promise<T>;
  async addPermissionToSpace<T = Models.SpacePermissionV2>(
    parameters: Parameters.AddPermissionToSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/permission`,
      method: 'POST',
      data: {
        subject: parameters.subject,
        operation: parameters.operation,
        _links: parameters.links,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds new custom content permission to space.
   *
   * If the permission to be added is a group permission, the group can be identified by its group name or group id.
   *
   * Note: Only apps can access this REST resource and only make changes to the respective app permissions.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async addCustomContentPermissions<T = unknown>(
    parameters: Parameters.AddCustomContentPermissions,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Adds new custom content permission to space.
   *
   * If the permission to be added is a group permission, the group can be identified by its group name or group id.
   *
   * Note: Only apps can access this REST resource and only make changes to the respective app permissions.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async addCustomContentPermissions<T = unknown>(
    parameters: Parameters.AddCustomContentPermissions,
    callback?: never
  ): Promise<T>;
  async addCustomContentPermissions<T = unknown>(
    parameters: Parameters.AddCustomContentPermissions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/permission/custom-content`,
      method: 'POST',
      data: {
        subject: parameters.subject,
        operations: parameters.operations,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a space permission. Note that removing Read Space permission for a user or group will remove all the space
   * permissions for that user or group.
   *
   * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async removePermission<T = void>(parameters: Parameters.RemovePermission, callback: Callback<T>): Promise<void>;
  /**
   * Removes a space permission. Note that removing Read Space permission for a user or group will remove all the space
   * permissions for that user or group.
   *
   * Note: Apps cannot access this REST resource - including when utilizing user impersonation.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
   */
  async removePermission<T = void>(parameters: Parameters.RemovePermission, callback?: never): Promise<T>;
  async removePermission<T = void>(parameters: Parameters.RemovePermission, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/permission/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
