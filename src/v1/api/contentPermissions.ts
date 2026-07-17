import { PermissionCheckResponseSchema, type PermissionCheckResponse } from '../models/permissionCheckResponse';
import type { CheckContentPermission } from '../parameters/checkContentPermission';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Check if a user or a group can perform an operation to the specified content. The `operation` to check must be
 * provided. The user’s account ID or the ID of the group can be provided in the `subject` to check permissions against
 * a specified user or group. The following permission checks are done to make sure that the user or group has the
 * proper access:
 *
 * - Site permissions
 * - Space permissions
 * - Content restrictions
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission) if checking permission for self, otherwise 'Confluence Administrator' global permission is
 * required.
 */
export async function checkContentPermission(
  client: Client,
  parameters: CheckContentPermission,
): Promise<PermissionCheckResponse> {
  const config: SendRequestOptions<PermissionCheckResponse> = {
    url: `/wiki/rest/api/content/${parameters.id}/permission/check`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      subject: parameters.subject,
      operation: parameters.operation,
    },
    schema: PermissionCheckResponseSchema,
  };

  return await client.sendRequest(config);
}
