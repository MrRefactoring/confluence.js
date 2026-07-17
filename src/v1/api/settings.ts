import { LookAndFeelSettingsSchema, type LookAndFeelSettings } from '../models/lookAndFeelSettings';
import { LookAndFeelSelectionSchema, type LookAndFeelSelection } from '../models/lookAndFeelSelection';
import { LookAndFeelWithLinksSchema, type LookAndFeelWithLinks } from '../models/lookAndFeelWithLinks';
import { SystemInfoEntitySchema, type SystemInfoEntity } from '../models/systemInfoEntity';
import type { GetLookAndFeelSettings } from '../parameters/getLookAndFeelSettings';
import type { UpdateLookAndFeel } from '../parameters/updateLookAndFeel';
import type { UpdateLookAndFeelSettings } from '../parameters/updateLookAndFeelSettings';
import type { ResetLookAndFeelSettings } from '../parameters/resetLookAndFeelSettings';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the look and feel settings for the site or a single space. This includes attributes such as the color scheme,
 * padding, and border radius.
 *
 * The look and feel settings for a space can be inherited from the global look and feel settings or provided by a
 * theme.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None
 */
export async function getLookAndFeelSettings(
  client: Client,
  parameters?: GetLookAndFeelSettings,
): Promise<LookAndFeelSettings> {
  const config: SendRequestOptions<LookAndFeelSettings> = {
    url: '/wiki/rest/api/settings/lookandfeel',
    method: 'GET',
    searchParams: {
      spaceKey: parameters?.spaceKey,
    },
    schema: LookAndFeelSettingsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the look and feel settings to the default (global) settings, the custom settings, or the current theme's
 * settings for a space. The custom and theme settings can only be selected if there is already a theme set for a space.
 * Note, the default space settings are inherited from the current global settings.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function updateLookAndFeel(client: Client, parameters: UpdateLookAndFeel): Promise<LookAndFeelSelection> {
  const config: SendRequestOptions<LookAndFeelSelection> = {
    url: '/wiki/rest/api/settings/lookandfeel',
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      spaceKey: parameters.spaceKey,
      lookAndFeelType: parameters.lookAndFeelType,
    },
    schema: LookAndFeelSelectionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the look and feel settings for the site or for a single space. If custom settings exist, they are updated. If
 * no custom settings exist, then a set of custom settings is created.
 *
 * Note, if a theme is selected for a space, the space look and feel settings are provided by the theme and cannot be
 * overridden.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function updateLookAndFeelSettings(
  client: Client,
  parameters: UpdateLookAndFeelSettings,
): Promise<LookAndFeelWithLinks> {
  const config: SendRequestOptions<LookAndFeelWithLinks> = {
    url: '/wiki/rest/api/settings/lookandfeel/custom',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      spaceKey: parameters.spaceKey,
    },
    body: {
      headings: parameters.headings,
      links: parameters.links,
      menus: parameters.menus,
      header: parameters.header,
      horizontalHeader: parameters.horizontalHeader,
      content: parameters.content,
      bordersAndDividers: parameters.bordersAndDividers,
      spaceReference: parameters.spaceReference,
    },
    schema: LookAndFeelWithLinksSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the custom look and feel settings for the site or a single space. This changes the values of the custom
 * settings to be the same as the default settings. It does not change which settings (default or custom) are selected.
 * Note, the default space settings are inherited from the current global settings.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function resetLookAndFeelSettings(client: Client, parameters: ResetLookAndFeelSettings): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/wiki/rest/api/settings/lookandfeel/custom',
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      spaceKey: parameters.spaceKey,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the system information for the Confluence Cloud tenant. This information is used by Atlassian.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getSystemInfo(client: Client): Promise<SystemInfoEntity> {
  const config: SendRequestOptions<SystemInfoEntity> = {
    url: '/wiki/rest/api/settings/systemInfo',
    method: 'GET',
    schema: SystemInfoEntitySchema,
  };

  return await client.sendRequest(config);
}
