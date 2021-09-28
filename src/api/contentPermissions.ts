import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentPermissions {
  constructor(private client: Client) {}

  /** @deprecated Will be removed in the next major version. Use `checkContentPermission` method instead. */
  async permissionCheck<T = Models.PermissionCheckResponse>(
    parameters: Parameters.PermissionCheck,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated Will be removed in the next major version. Use `checkContentPermission` method instead. */
  async permissionCheck<T = Models.PermissionCheckResponse>(
    parameters: Parameters.PermissionCheck,
    callback?: never
  ): Promise<T>;
  async permissionCheck<T = Models.PermissionCheckResponse>(
    parameters: Parameters.PermissionCheck,
    callback?: Callback<T>,
  ): Promise<void | T> {
    return this.checkContentPermission(parameters, callback!);
  }

  /**
   * Check if a user or a group can perform an operation to the specified content. The `operation` to check must be
   * provided. The user’s account ID or the ID of the group can be provided in the `subject` to check permissions
   * against a specified user or group. The following permission checks are done to make sure that the user or group has
   * the proper access:
   *
   * - Site permissions
   * - Space permissions
   * - Content restrictions
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) if checking permission for self, otherwise 'Confluence Administrator' global
   * permission is required.
   */
  async checkContentPermission<T = Models.PermissionCheckResponse>(
    parameters: Parameters.CheckContentPermission,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Check if a user or a group can perform an operation to the specified content. The `operation` to check must be
   * provided. The user’s account ID or the ID of the group can be provided in the `subject` to check permissions
   * against a specified user or group. The following permission checks are done to make sure that the user or group has
   * the proper access:
   *
   * - Site permissions
   * - Space permissions
   * - Content restrictions
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) if checking permission for self, otherwise 'Confluence Administrator' global
   * permission is required.
   */
  async checkContentPermission<T = Models.PermissionCheckResponse>(
    parameters: Parameters.CheckContentPermission,
    callback?: never
  ): Promise<T>;
  async checkContentPermission<T = Models.PermissionCheckResponse>(
    parameters: Parameters.CheckContentPermission,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/permission/check`,
      method: 'POST',
      data: {
        subject: parameters.subject,
        operation: parameters.operation,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'checkContentPermission' });
  }
}
