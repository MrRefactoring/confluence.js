import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

/** @deprecated Use {@link ContentStates} instead. */
export class ContentContentState {
  /** @deprecated */
  constructor(private client: Client) {}

  /**
   * @deprecated Gets the current page status of the draft or published version of content. To specify the draft
   *   version, set the parameter status to PUBLISHED, otherwise DRAFT.
   */
  async getContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.GetContentState,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Gets the current page status of the draft or published version of content. To specify the draft
   *   version, set the parameter status to PUBLISHED, otherwise DRAFT.
   */
  async getContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.GetContentState,
    callback?: never
  ): Promise<T>;
  async getContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.GetContentState,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.contentId}/state`,
      method: 'GET',
      params: {
        designation: parameters.designation,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Sets the content state of the content specified and creates a new version (publishes the content
   *   without changing the body) of the content with the new status. The desired type of status must be allowed. There
   *   are space suggested statuses and custom statuses. To specify the desired new status, one can use the id of the
   *   status or the name and color of the status. If contentStateId is defined, then name and color are ignored. If
   *   contentStateId is not defined, name and color will be used if provided. Firstly, we will determine if a status of
   *   this name and color exists, and if it does, that this status is used. If it does not exist, and custom statuses
   *   are allowed, a custom status with this name and color will be created. Color can be specified in traditional
   *   english colors (teal, magenta, lavender, etc.) or as a hex string ex: #0ff0Fd.
   */
  async setContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.SetContentState,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Sets the content state of the content specified and creates a new version (publishes the content
   *   without changing the body) of the content with the new status. The desired type of status must be allowed. There
   *   are space suggested statuses and custom statuses. To specify the desired new status, one can use the id of the
   *   status or the name and color of the status. If contentStateId is defined, then name and color are ignored. If
   *   contentStateId is not defined, name and color will be used if provided. Firstly, we will determine if a status of
   *   this name and color exists, and if it does, that this status is used. If it does not exist, and custom statuses
   *   are allowed, a custom status with this name and color will be created. Color can be specified in traditional
   *   english colors (teal, magenta, lavender, etc.) or as a hex string ex: #0ff0Fd.
   */
  async setContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.SetContentState,
    callback?: never
  ): Promise<T>;
  async setContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.SetContentState,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.contentId}/state`,
      method: 'PUT',
      params: {
        contentStateId: parameters.contentStateId,
        name: parameters.name,
        color: parameters.color,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Removes the content state of the content specified and creates a new version (publishes the content
   *   without changing the body) of the content with the new status.
   */
  async removeContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.RemoveContentState,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Removes the content state of the content specified and creates a new version (publishes the content
   *   without changing the body) of the content with the new status.
   */
  async removeContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.RemoveContentState,
    callback?: never
  ): Promise<T>;
  async removeContentState<T = Models.ContentStateContainer>(
    parameters: Parameters.RemoveContentState,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.contentId}/state`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /** @deprecated Gets a Global Timestamp of the last time the content state was updated */
  async getContentStateLastUpdated<T = unknown>(
    parameters: Parameters.GetContentStateLastUpdated,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated Gets a Global Timestamp of the last time the content state was updated */
  async getContentStateLastUpdated<T = unknown>(
    parameters: Parameters.GetContentStateLastUpdated,
    callback?: never
  ): Promise<T>;
  async getContentStateLastUpdated<T = unknown>(
    parameters: Parameters.GetContentStateLastUpdated,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.contentId}/state/last-updated`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /** @deprecated Gets content states that are available for the content to be set as. */
  async getAvailableContentStates<T = Models.AvailableContentStates>(
    parameters: Parameters.GetAvailableContentStates,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated Gets content states that are available for the content to be set as. */
  async getAvailableContentStates<T = Models.AvailableContentStates>(
    parameters: Parameters.GetAvailableContentStates,
    callback?: never
  ): Promise<T>;
  async getAvailableContentStates<T = Models.AvailableContentStates>(
    parameters: Parameters.GetAvailableContentStates,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.contentId}/state/available-states`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
