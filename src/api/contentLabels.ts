import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentLabels {
  constructor(private client: Client) {}

  /**
   * Returns the labels on a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space and
   * permission to view the content if it is a page.
   */
  async getLabelsForContent<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForContent,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the labels on a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space and
   * permission to view the content if it is a page.
   */
  async getLabelsForContent<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForContent,
    callback?: never
  ): Promise<T>;
  async getLabelsForContent<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/label`,
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
  async addLabelsToContent<T = Models.LabelArray>(
    parameters: Parameters.AddLabelsToContent,
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
  async addLabelsToContent<T = Models.LabelArray>(
    parameters: Parameters.AddLabelsToContent,
    callback?: never
  ): Promise<T>;
  async addLabelsToContent<T = Models.LabelArray>(
    parameters: Parameters.AddLabelsToContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/label`,
      method: 'POST',
      params: {
        'use-400-error-response': parameters['use-400-error-response'],
      },
      data: parameters.body,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a label from a piece of content. This is similar to [Remove label from
   * content](#api-content-id-label-label-delete) except that the label name is specified via a query parameter.
   *
   * Use this method if the label name has "/" characters, as [Remove label from content using query
   * parameter](#api-content-id-label-delete) does not accept "/" characters for the label name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async removeLabelFromContentUsingQueryParameter<T = void>(
    parameters: Parameters.RemoveLabelFromContentUsingQueryParameter,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Removes a label from a piece of content. This is similar to [Remove label from
   * content](#api-content-id-label-label-delete) except that the label name is specified via a query parameter.
   *
   * Use this method if the label name has "/" characters, as [Remove label from content using query
   * parameter](#api-content-id-label-delete) does not accept "/" characters for the label name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async removeLabelFromContentUsingQueryParameter<T = void>(
    parameters: Parameters.RemoveLabelFromContentUsingQueryParameter,
    callback?: never
  ): Promise<T>;
  async removeLabelFromContentUsingQueryParameter<T = void>(
    parameters: Parameters.RemoveLabelFromContentUsingQueryParameter,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/label`,
      method: 'DELETE',
      params: {
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a label from a piece of content. This is similar to [Remove label from content using query
   * parameter](#api-content-id-label-delete) except that the label name is specified via a path parameter.
   *
   * Use this method if the label name does not have "/" characters, as the path parameter does not accept "/"
   * characters for security reasons. Otherwise, use [Remove label from content using query
   * parameter](#api-content-id-label-delete).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async removeLabelFromContent<T = void>(
    parameters: Parameters.RemoveLabelFromContent,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Removes a label from a piece of content. This is similar to [Remove label from content using query
   * parameter](#api-content-id-label-delete) except that the label name is specified via a path parameter.
   *
   * Use this method if the label name does not have "/" characters, as the path parameter does not accept "/"
   * characters for security reasons. Otherwise, use [Remove label from content using query
   * parameter](#api-content-id-label-delete).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async removeLabelFromContent<T = void>(parameters: Parameters.RemoveLabelFromContent, callback?: never): Promise<T>;
  async removeLabelFromContent<T = void>(
    parameters: Parameters.RemoveLabelFromContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/label/${parameters.label}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
