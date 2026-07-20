import type { RegisterModules } from '../parameters/registerModules';
import type { RemoveModules } from '../parameters/removeModules';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns all modules registered dynamically by the calling app.
 *
 * **[Permissions](#permissions) required:** Only Connect apps can make this request.
 */
export async function getModules(client: Client): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/wiki/rest/atlassian-connect/1/app/module/dynamic',
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/**
 * Registers a list of modules. For the list of modules that support dynamic registration, see [Dynamic
 * modules](https://developer.atlassian.com/cloud/confluence/dynamic-modules/).
 *
 * **[Permissions](#permissions) required:** Only Connect apps can make this request.
 */
export async function registerModules(client: Client, parameters: RegisterModules): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/atlassian-connect/1/app/module/dynamic',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Remove all or a list of modules registered by the calling app.
 *
 * **[Permissions](#permissions) required:** Only Connect apps can make this request.
 */
export async function removeModules(client: Client, parameters: RemoveModules): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/atlassian-connect/1/app/module/dynamic',
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      moduleKey: parameters.moduleKey,
    },
  };

  return await client.sendRequest(config);
}
