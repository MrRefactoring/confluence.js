import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ContentStates {
  constructor(private client: Client) {}

  /**
   * Gets the current content state of the draft or current version of content. To specify the draft version, set the
   * parameter status to draft, otherwise archived or current will get the relevant published state.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.GetContentState,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Gets the current content state of the draft or current version of content. To specify the draft version, set the
   * parameter status to draft, otherwise archived or current will get the relevant published state.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.GetContentState,
    callback?: never,
  ): Promise<T>;
  async getContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.GetContentState,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/state`,
      method: 'GET',
      params: {
        status: parameters.status,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the content state of the content specified and creates a new version (publishes the content without changing
   * the body) of the content with the new state.
   *
   * You may pass in either an id of a state, or the name and color of a desired new state. If all 3 are passed in, id
   * will be used. If the name and color passed in already exist under the current user's existing custom states, the
   * existing state will be reused. If custom states are disabled in the space of the content (which can be determined
   * by getting the content state space settings of the content's space) then this set will fail.
   *
   * You may not remove a content state via this PUT request. You must use the DELETE method. A specified state is
   * required in the body of this request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async setContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.SetContentState,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the content state of the content specified and creates a new version (publishes the content without changing
   * the body) of the content with the new state.
   *
   * You may pass in either an id of a state, or the name and color of a desired new state. If all 3 are passed in, id
   * will be used. If the name and color passed in already exist under the current user's existing custom states, the
   * existing state will be reused. If custom states are disabled in the space of the content (which can be determined
   * by getting the content state space settings of the content's space) then this set will fail.
   *
   * You may not remove a content state via this PUT request. You must use the DELETE method. A specified state is
   * required in the body of this request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async setContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.SetContentState,
    callback?: never,
  ): Promise<T>;
  async setContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.SetContentState,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/state`,
      method: 'PUT',
      params: {
        status: parameters.status,
      },
      data: {
        name: parameters.name,
        color: parameters.color,
        id: parameters.stateId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes the content state of the content specified and creates a new version (publishes the content without
   * changing the body) of the content with the new status.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async removeContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.RemoveContentState,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes the content state of the content specified and creates a new version (publishes the content without
   * changing the body) of the content with the new status.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async removeContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.RemoveContentState,
    callback?: never,
  ): Promise<T>;
  async removeContentState<T = Models.ContentStateResponse>(
    parameters: Parameters.RemoveContentState,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/state`,
      method: 'DELETE',
      params: {
        status: parameters.status,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Gets content states that are available for the content to be set as. Will return all enabled Space Content States.
   * Will only return most the 3 most recently published custom content states to match UI editor list. To get all
   * custom content states, use the /content-states endpoint.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async getAvailableContentStates<T = Models.AvailableContentStates>(
    parameters: Parameters.GetAvailableContentStates,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Gets content states that are available for the content to be set as. Will return all enabled Space Content States.
   * Will only return most the 3 most recently published custom content states to match UI editor list. To get all
   * custom content states, use the /content-states endpoint.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async getAvailableContentStates<T = Models.AvailableContentStates>(
    parameters: Parameters.GetAvailableContentStates,
    callback?: never,
  ): Promise<T>;
  async getAvailableContentStates<T = Models.AvailableContentStates>(
    parameters: Parameters.GetAvailableContentStates,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/state/available`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Get custom content states that authenticated user has created.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required** Must have user authentication.
   */
  async getCustomContentStates<T = Models.ContentState[]>(callback: Callback<T>): Promise<void>;
  /**
   * Get custom content states that authenticated user has created.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required** Must have user authentication.
   */
  async getCustomContentStates<T = Models.ContentState[]>(callback?: never): Promise<T>;
  async getCustomContentStates<T = Models.ContentState[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/content-states',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Get content states that are suggested in the space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Space view permission
   */
  async getSpaceContentStates<T = Models.ContentState[]>(
    parameters: Parameters.GetSpaceContentStates,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Get content states that are suggested in the space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Space view permission
   */
  async getSpaceContentStates<T = Models.ContentState[]>(
    parameters: Parameters.GetSpaceContentStates,
    callback?: never,
  ): Promise<T>;
  async getSpaceContentStates<T = Models.ContentState[]>(
    parameters: Parameters.GetSpaceContentStates,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/state`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Get object describing whether content states are allowed at all, if custom content states or space content states
   * are restricted, and a list of space content states allowed for the space if they are not restricted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Space admin permission
   */
  async getContentStateSettings<T = Models.ContentStateSettings>(
    parameters: Parameters.GetContentStateSettings,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Get object describing whether content states are allowed at all, if custom content states or space content states
   * are restricted, and a list of space content states allowed for the space if they are not restricted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Space admin permission
   */
  async getContentStateSettings<T = Models.ContentStateSettings>(
    parameters: Parameters.GetContentStateSettings,
    callback?: never,
  ): Promise<T>;
  async getContentStateSettings<T = Models.ContentStateSettings>(
    parameters: Parameters.GetContentStateSettings,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/state/settings`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
