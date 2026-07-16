import type * as Models from './models/index.js';
import type * as Parameters from './parameters/index.js';
import type { Client } from '../clients/index.js';
import type { Callback } from '../callback.js';
import type { RequestConfig } from '../requestConfig.js';

export class Experimental {
  constructor(private client: Client) {}

  /**
   * Moves a pagetree rooted at a page to the space's trash:
   *
   * - If the content's type is `page` and its status is `current`, it will be trashed including all its descendants.
   * - For every other combination of content type and status, this API is not supported.
   *
   * This API accepts the pageTree delete request and returns a task ID. The delete process happens asynchronously.
   *
   * Use the `/longtask/<taskId>` REST API to get the copy task status.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Delete' permission for the space that the
   * content is in.
   */
  async deletePageTree<T = Models.LongTask>(
    parameters: Parameters.DeletePageTree,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Moves a pagetree rooted at a page to the space's trash:
   *
   * - If the content's type is `page` and its status is `current`, it will be trashed including all its descendants.
   * - For every other combination of content type and status, this API is not supported.
   *
   * This API accepts the pageTree delete request and returns a task ID. The delete process happens asynchronously.
   *
   * Use the `/longtask/<taskId>` REST API to get the copy task status.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Delete' permission for the space that the
   * content is in.
   */
  async deletePageTree<T = Models.LongTask>(parameters: Parameters.DeletePageTree, callback?: never): Promise<T>;
  async deletePageTree<T = Models.LongTask>(
    parameters: Parameters.DeletePageTree,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/pageTree`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of labels associated with a space. Can provide a prefix as well as other filters to select different
   * types of labels.
   */
  async getLabelsForSpace<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForSpace,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of labels associated with a space. Can provide a prefix as well as other filters to select different
   * types of labels.
   */
  async getLabelsForSpace<T = Models.LabelArray>(
    parameters: Parameters.GetLabelsForSpace,
    callback?: never,
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
    callback: Callback<T>,
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
    callback: Callback<T>,
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
}
