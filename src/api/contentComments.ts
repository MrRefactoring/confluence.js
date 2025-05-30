import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class ContentComments {
  constructor(private client: Client) {}

  /**
   * Returns the comments on a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentComments<T = Models.ContentArray>(
    parameters: Parameters.GetContentComments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the comments on a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentComments<T = Models.ContentArray>(
    parameters: Parameters.GetContentComments,
    callback?: never,
  ): Promise<T>;
  async getContentComments<T = Models.ContentArray>(
    parameters: Parameters.GetContentComments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child/comment`,
      method: 'GET',
      params: {
        parentVersion: parameters.parentVersion,
        start: parameters.start,
        limit: parameters.limit,
        location: parameters.location,
        depth: parameters.depth,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
