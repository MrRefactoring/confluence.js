import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Settings {
  constructor(private client: Client) { }

  /**
   * Returns the look and feel settings for the site or a single space. This
   * includes attributes such as the color scheme, padding, and border radius.
   *
   * The look and feel settings for a space can be inherited from the global
   * look and feel settings or provided by a theme.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * None */
  async getLookAndFeelSettings<T = Models.LookAndFeelSettings>(parameters: Parameters.GetLookAndFeelSettings | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns the look and feel settings for the site or a single space. This
   * includes attributes such as the color scheme, padding, and border radius.
   *
   * The look and feel settings for a space can be inherited from the global
   * look and feel settings or provided by a theme.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * None */
  async getLookAndFeelSettings<T = Models.LookAndFeelSettings>(parameters?: Parameters.GetLookAndFeelSettings, callback?: never): Promise<T>;
  async getLookAndFeelSettings<T = Models.LookAndFeelSettings>(parameters?: Parameters.GetLookAndFeelSettings, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/settings/lookandfeel',
      method: 'GET',
      params: {
        spaceKey: parameters?.spaceKey,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getLookAndFeelSettings' });
  }

  /**
   * Updates the look and feel settings for the site or for a single space.
   * If custom settings exist, they are updated. If no custom settings exist,
   * then a set of custom settings is created.
   *
   * Note, if a theme is selected for a space, the space look and feel settings
   * are provided by the theme and cannot be overridden.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * 'Admin' permission for the space. */
  async updateLookAndFeelSettings<T = Models.LookAndFeelUpdated>(parameters: Parameters.UpdateLookAndFeelSettings | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Updates the look and feel settings for the site or for a single space.
   * If custom settings exist, they are updated. If no custom settings exist,
   * then a set of custom settings is created.
   *
   * Note, if a theme is selected for a space, the space look and feel settings
   * are provided by the theme and cannot be overridden.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * 'Admin' permission for the space. */
  async updateLookAndFeelSettings<T = Models.LookAndFeelUpdated>(parameters?: Parameters.UpdateLookAndFeelSettings, callback?: never): Promise<T>;
  async updateLookAndFeelSettings<T = Models.LookAndFeelUpdated>(parameters?: Parameters.UpdateLookAndFeelSettings, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/settings/lookandfeel/custom',
      method: 'POST',
      params: {
        spaceKey: parameters?.spaceKey,
      },
      data: {
        headings: parameters?.headings,
        links: parameters?.links,
        menus: parameters?.menus,
        header: parameters?.header,
        content: parameters?.content,
        bordersAndDividers: parameters?.bordersAndDividers,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateLookAndFeelSettings' });
  }

  /**
   * Resets the custom look and feel settings for the site or a single space.
   * This changes the values of the custom settings to be the same as the
   * default settings. It does not change which settings (default or custom)
   * are selected. Note, the default space settings are inherited from the
   * current global settings.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * 'Admin' permission for the space. */
  async resetLookAndFeelSettings<T = void>(parameters: Parameters.ResetLookAndFeelSettings | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Resets the custom look and feel settings for the site or a single space.
   * This changes the values of the custom settings to be the same as the
   * default settings. It does not change which settings (default or custom)
   * are selected. Note, the default space settings are inherited from the
   * current global settings.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * 'Admin' permission for the space. */
  async resetLookAndFeelSettings<T = void>(parameters?: Parameters.ResetLookAndFeelSettings, callback?: never): Promise<T>;
  async resetLookAndFeelSettings<T = void>(parameters?: Parameters.ResetLookAndFeelSettings, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/settings/lookandfeel/custom',
      method: 'DELETE',
      params: {
        spaceKey: parameters?.spaceKey,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'resetLookAndFeelSettings' });
  }

  /**
   * Sets the look and feel settings to either the default settings or the
   * custom settings, for the site or a single space. Note, the default
   * space settings are inherited from the current global settings.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * 'Admin' permission for the space. */
  async setLookAndFeelSettings<T = unknown>(parameters: Parameters.SetLookAndFeelSettings | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Sets the look and feel settings to either the default settings or the
   * custom settings, for the site or a single space. Note, the default
   * space settings are inherited from the current global settings.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * 'Admin' permission for the space. */
  async setLookAndFeelSettings<T = unknown>(parameters?: Parameters.SetLookAndFeelSettings, callback?: never): Promise<T>;
  async setLookAndFeelSettings<T = unknown>(parameters?: Parameters.SetLookAndFeelSettings, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/settings/lookandfeel/selected',
      method: 'PUT',
      params: {
        spaceKey: parameters?.spaceKey,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'setLookAndFeelSettings' });
  }

  /**
   * Returns the system information for the Confluence Cloud tenant. This
   * information is used by Atlassian.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to access the Confluence site ('Can use' global permission). */
  async getSystemInfo<T = Models.SystemInfoEntity>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the system information for the Confluence Cloud tenant. This
   * information is used by Atlassian.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
   * Permission to access the Confluence site ('Can use' global permission). */
  async getSystemInfo<T = Models.SystemInfoEntity>(callback?: never): Promise<T>;
  async getSystemInfo<T = Models.SystemInfoEntity>(callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/settings/systemInfo',
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getSystemInfo' });
  }
}
