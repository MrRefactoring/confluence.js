import { AdminKeySchema, type AdminKey } from '../models/adminKey';
import type { EnableAdminKey } from '../parameters/enableAdminKey';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns information about the admin key if one is currently enabled for the calling user within the site.
 *
 * **[Permissions](https://support.atlassian.com/user-management/docs/give-users-admin-permissions/#Centralized-user-management-content)
 * required**: User must be an organization or site admin.
 */
export async function getAdminKey(client: Client, options?: RequestOptions): Promise<AdminKey> {
  const config: SendRequestOptions<AdminKey> = {
    url: '/wiki/api/v2/admin-key',
    method: 'GET',
    schema: AdminKeySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Enables admin key access for the calling user within the site. If an admin key already exists for the user, a new one
 * will be issued with an updated expiration time.
 *
 * **Note:** The `durationInMinutes` field within the request body is optional. If the request body is empty or if the
 * `durationInMinutes` is set to 0 minutes, a new admin key will be issued to the calling user with a default duration
 * of 10 minutes.
 *
 * **[Permissions](https://support.atlassian.com/user-management/docs/give-users-admin-permissions/#Centralized-user-management-content)
 * required**: User must be an organization or site admin.
 */
export async function enableAdminKey(
  client: Client,
  parameters: EnableAdminKey,
  options?: RequestOptions,
): Promise<AdminKey> {
  const config: SendRequestOptions<AdminKey> = {
    url: '/wiki/api/v2/admin-key',
    method: 'POST',
    body: parameters.body,
    schema: AdminKeySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Disables admin key access for the calling user within the site.
 *
 * **[Permissions](https://support.atlassian.com/user-management/docs/give-users-admin-permissions/#Centralized-user-management-content)
 * required**: User must be an organization or site admin.
 */
export async function disableAdminKey(client: Client, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/api/v2/admin-key',
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
