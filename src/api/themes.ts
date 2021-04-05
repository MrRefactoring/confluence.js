import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Themes {
  constructor(private client: Client) { }
  /**
     * Returns all themes, not including the default theme.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None */
  async getThemes<T = Models.ThemeArray>(parameters: Parameters.GetThemes | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns all themes, not including the default theme.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None */
  async getThemes<T = Models.ThemeArray>(parameters?: Parameters.GetThemes, callback?: never): Promise<T>;
  async getThemes<T = Models.ThemeArray>(parameters?: Parameters.GetThemes, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/settings/theme',
      method: 'GET',
      params: {
        start: parameters?.start,
        limit: parameters?.limit,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getThemes' });
  }
  /**
     * Returns the globally assigned theme.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None */
  async getGlobalTheme<T = Models.Theme>(callback: Callback<T>): Promise<void>;
  /**
     * Returns the globally assigned theme.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None */
  async getGlobalTheme<T = Models.Theme>(callback?: never): Promise<T>;
  async getGlobalTheme<T = Models.Theme>(callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/settings/theme/selected',
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getGlobalTheme' });
  }
  /**
     * Returns a theme. This includes information about the theme name,
     * description, and icon.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None */
  async getTheme<T = Models.Theme>(parameters: Parameters.GetTheme, callback: Callback<T>): Promise<void>;
  /**
     * Returns a theme. This includes information about the theme name,
     * description, and icon.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: None */
  async getTheme<T = Models.Theme>(parameters: Parameters.GetTheme, callback?: never): Promise<T>;
  async getTheme<T = Models.Theme>(parameters: Parameters.GetTheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/settings/theme/${parameters.themeKey}`,
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getTheme' });
  }
  /**
     * Returns the theme selected for a space, if one is set. If no space
     * theme is set, this means that the space is inheriting the global look
     * and feel settings.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**: ‘View’ permission for the space. */
  async getSpaceTheme<T = Models.Theme>(parameters: Parameters.GetSpaceTheme, callback: Callback<T>): Promise<void>;
  /**
     * Returns the theme selected for a space, if one is set. If no space
     * theme is set, this means that the space is inheriting the global look
     * and feel settings.
     *
     * **[Permissions required](https://confluence.atlassian.com/x/_AozKw)**: ‘View’ permission for the space. */
  async getSpaceTheme<T = Models.Theme>(parameters: Parameters.GetSpaceTheme, callback?: never): Promise<T>;
  async getSpaceTheme<T = Models.Theme>(parameters: Parameters.GetSpaceTheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/theme`,
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getSpaceTheme' });
  }
  /**
     * Sets the theme for a space. Note, if you want to reset the space theme to
     * the default Confluence theme, use the 'Reset space theme' method instead
     * of this method.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Admin' permission for the space. */
  async setSpaceTheme<T = Models.Theme>(parameters: Parameters.SetSpaceTheme, callback: Callback<T>): Promise<void>;
  /**
     * Sets the theme for a space. Note, if you want to reset the space theme to
     * the default Confluence theme, use the 'Reset space theme' method instead
     * of this method.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Admin' permission for the space. */
  async setSpaceTheme<T = Models.Theme>(parameters: Parameters.SetSpaceTheme, callback?: never): Promise<T>;
  async setSpaceTheme<T = Models.Theme>(parameters: Parameters.SetSpaceTheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/theme`,
      method: 'PUT',
      data: {
        themeKey: parameters.themeKey,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'setSpaceTheme' });
  }
  /**
     * Resets the space theme. This means that the space will inherit the
     * global look and feel settings
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Admin' permission for the space. */
  async resetSpaceTheme<T = void>(parameters: Parameters.ResetSpaceTheme, callback: Callback<T>): Promise<void>;
  /**
     * Resets the space theme. This means that the space will inherit the
     * global look and feel settings
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Admin' permission for the space. */
  async resetSpaceTheme<T = void>(parameters: Parameters.ResetSpaceTheme, callback?: never): Promise<T>;
  async resetSpaceTheme<T = void>(parameters: Parameters.ResetSpaceTheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/space/${parameters.spaceKey}/theme`,
      method: 'DELETE',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'resetSpaceTheme' });
  }
}
