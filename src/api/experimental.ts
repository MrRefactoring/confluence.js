import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Experimental {
  constructor(private client: Client) {}

  /**
   * Returns a list of labels associated with a space. Can provide a prefix as well as other filters to select different
   * types of labels.
   */
  async getLabelsForSpace<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of labels associated with a space. Can provide a prefix as well as other filters to select different
   * types of labels.
   */
  async getLabelsForSpace<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForSpace,
    callback?: never
  ): Promise<T>;
  async getLabelsForSpace<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/label`,
      method: 'GET',
      params: {
        prefix: parameters.prefix,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds labels to a piece of content. Does not modify the existing labels.
   *
   * Notes:
   *
   * - Labels can also be added when creating content ([Create content](#api-content-post)).
   * - Labels can be updated when updating content ([Update content](#api-content-id-put)). This will delete the existing
   *   labels and replace them with the labels in the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async addLabelsToSpace<T = Models.LabelArray>(
    parameters: Parameters.AddLabelsToSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Adds labels to a piece of content. Does not modify the existing labels.
   *
   * Notes:
   *
   * - Labels can also be added when creating content ([Create content](#api-content-post)).
   * - Labels can be updated when updating content ([Update content](#api-content-id-put)). This will delete the existing
   *   labels and replace them with the labels in the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async addLabelsToSpace<T = Models.LabelArray>(parameters: Parameters.AddLabelsToSpace, callback?: never): Promise<T>;
  async addLabelsToSpace<T = Models.LabelArray>(
    parameters: Parameters.AddLabelsToSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/label`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  async deleteLabelFromSpace<T = void>(
    parameters: Parameters.DeleteLabelFromSpace,
    callback: Callback<T>
  ): Promise<void>;
  async deleteLabelFromSpace<T = void>(parameters: Parameters.DeleteLabelFromSpace, callback?: never): Promise<T>;
  async deleteLabelFromSpace<T = void>(
    parameters: Parameters.DeleteLabelFromSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/space/${parameters.spaceKey}/label`,
      method: 'DELETE',
      params: {
        name: parameters.name,
        prefix: parameters.prefix,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get the total number of views a piece of content has. */
  async getViews<T = Models.GetViews>(parameters: Parameters.GetViews, callback: Callback<T>): Promise<void>;
  /** Get the total number of views a piece of content has. */
  async getViews<T = Models.GetViews>(parameters: Parameters.GetViews, callback?: never): Promise<T>;
  async getViews<T = Models.GetViews>(parameters: Parameters.GetViews, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/analytics/content/${parameters.contentId}/views`,
      method: 'GET',
      params: {
        fromDate: parameters.fromDate,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get the total number of distinct viewers a piece of content has. */
  async getViewers<T = Models.GetViewers>(parameters: Parameters.GetViewers, callback: Callback<T>): Promise<void>;
  /** Get the total number of distinct viewers a piece of content has. */
  async getViewers<T = Models.GetViewers>(parameters: Parameters.GetViewers, callback?: never): Promise<T>;
  async getViewers<T = Models.GetViewers>(
    parameters: Parameters.GetViewers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/analytics/content/${parameters.contentId}/viewers`,
      method: 'GET',
      params: {
        fromDate: parameters.fromDate,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
