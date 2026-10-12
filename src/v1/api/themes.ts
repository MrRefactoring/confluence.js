import { ThemeArraySchema, type ThemeArray } from '../models/themeArray';
import { ThemeSchema, type Theme } from '../models/theme';
import type { GetThemes } from '../parameters/getThemes';
import type { GetTheme } from '../parameters/getTheme';
import type { GetSpaceTheme } from '../parameters/getSpaceTheme';
import type { SetSpaceTheme } from '../parameters/setSpaceTheme';
import type { ResetSpaceTheme } from '../parameters/resetSpaceTheme';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns all themes, not including the default theme.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None
 */
export async function getThemes(client: Client, parameters?: GetThemes, options?: RequestOptions): Promise<ThemeArray> {
  const config: SendRequestOptions<ThemeArray> = {
    url: '/wiki/rest/api/settings/theme',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: ThemeArraySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the globally assigned theme.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None
 */
export async function getGlobalTheme(client: Client, options?: RequestOptions): Promise<Theme> {
  const config: SendRequestOptions<Theme> = {
    url: '/wiki/rest/api/settings/theme/selected',
    method: 'GET',
    schema: ThemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a theme. This includes information about the theme name, description, and icon.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None
 */
export async function getTheme(client: Client, parameters: GetTheme, options?: RequestOptions): Promise<Theme> {
  const config: SendRequestOptions<Theme> = {
    url: `/wiki/rest/api/settings/theme/${parameters.themeKey}`,
    method: 'GET',
    schema: ThemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the theme selected for a space, if one is set. If no space theme is set, this means that the space is
 * inheriting the global look and feel settings.
 *
 * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**: ‘View’ permission for the space.
 */
export async function getSpaceTheme(
  client: Client,
  parameters: GetSpaceTheme,
  options?: RequestOptions,
): Promise<Theme> {
  const config: SendRequestOptions<Theme> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/theme`,
    method: 'GET',
    schema: ThemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the theme for a space. Note, if you want to reset the space theme to the default Confluence theme, use the
 * 'Reset space theme' method instead of this method.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function setSpaceTheme(
  client: Client,
  parameters: SetSpaceTheme,
  options?: RequestOptions,
): Promise<Theme> {
  const config: SendRequestOptions<Theme> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/theme`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      themeKey: parameters.themeKey,
    },
    schema: ThemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the space theme. This means that the space will inherit the global look and feel settings
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function resetSpaceTheme(
  client: Client,
  parameters: ResetSpaceTheme,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/theme`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
