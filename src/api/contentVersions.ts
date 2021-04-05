import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentVersions {
  constructor(private client: Client) { }
  /**
     * Returns the versions for a piece of content in descending order.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to view the content. If the content is a blog post, 'View' permission
     * for the space is required. */
  async getContentVersions<T = Models.VersionArray>(parameters: Parameters.GetContentVersions, callback: Callback<T>): Promise<void>;
  /**
     * Returns the versions for a piece of content in descending order.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to view the content. If the content is a blog post, 'View' permission
     * for the space is required. */
  async getContentVersions<T = Models.VersionArray>(parameters: Parameters.GetContentVersions, callback?: never): Promise<T>;
  async getContentVersions<T = Models.VersionArray>(parameters: Parameters.GetContentVersions, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/version`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
        expand: parameters.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getContentVersions' });
  }
  /**
     * Restores a historical version to be the latest version. That is, a new version
     * is created with the content of the historical version.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to update the content. */
  async restoreContentVersion<T = Models.Version>(parameters: Parameters.RestoreContentVersion, callback: Callback<T>): Promise<void>;
  /**
     * Restores a historical version to be the latest version. That is, a new version
     * is created with the content of the historical version.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to update the content. */
  async restoreContentVersion<T = Models.Version>(parameters: Parameters.RestoreContentVersion, callback?: never): Promise<T>;
  async restoreContentVersion<T = Models.Version>(parameters: Parameters.RestoreContentVersion, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/version`,
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: {
        operationKey: parameters.operationKey,
        params: parameters.params,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'restoreContentVersion' });
  }
  /**
     * Returns a version for a piece of content.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to view the content. If the content is a blog post, 'View' permission
     * for the space is required. */
  async getContentVersion<T = Models.Version>(parameters: Parameters.GetContentVersion, callback: Callback<T>): Promise<void>;
  /**
     * Returns a version for a piece of content.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to view the content. If the content is a blog post, 'View' permission
     * for the space is required. */
  async getContentVersion<T = Models.Version>(parameters: Parameters.GetContentVersion, callback?: never): Promise<T>;
  async getContentVersion<T = Models.Version>(parameters: Parameters.GetContentVersion, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/version/${parameters.versionNumber}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getContentVersion' });
  }
  /**
     * Delete a historical version. This does not delete the changes made to the
     * content in that version, rather the changes for the deleted version are
     * rolled up into the next version. Note, you cannot delete the current version.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to update the content. */
  async deleteContentVersion<T = void>(parameters: Parameters.DeleteContentVersion, callback: Callback<T>): Promise<void>;
  /**
     * Delete a historical version. This does not delete the changes made to the
     * content in that version, rather the changes for the deleted version are
     * rolled up into the next version. Note, you cannot delete the current version.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to update the content. */
  async deleteContentVersion<T = void>(parameters: Parameters.DeleteContentVersion, callback?: never): Promise<T>;
  async deleteContentVersion<T = void>(parameters: Parameters.DeleteContentVersion, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/content/${parameters.id}/version/${parameters.versionNumber}`,
      method: 'DELETE',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'deleteContentVersion' });
  }
}
