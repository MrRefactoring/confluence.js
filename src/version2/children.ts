import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { PaginationService } from '../services';
import { RequestConfig } from '../requestConfig';

export class Children {
  private paginationService = new PaginationService();

  constructor(private client: Client) {}

  /** Fetches all child pages. */
  async getAllChildPages<T = Models.ChildPage[]>(
    parameters: Parameters.GetChildPages,
    callback: Callback<T>,
  ): Promise<void>;
  /** Fetches all child pages. */
  async getAllChildPages<T = Models.ChildPage[]>(parameters: Parameters.GetChildPages, callback?: never): Promise<T>;
  async getAllChildPages<T = Models.ChildPage[]>(
    parameters: Parameters.GetChildPages,
    callback?: Callback<T>,
  ): Promise<void | T> {
    try {
      const { getAll: getAllChildPages } = await this.getChildPages(parameters);

      const childPages = await getAllChildPages();

      const responseHandler = this.client.getResponseHandler(callback);

      return responseHandler(childPages as T);
    } catch (e: any) {
      const errorHandler = this.client.getErrorHandler(callback);

      return errorHandler(e);
    }
  }

  /**
   * Returns all child pages for given page id. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only pages that the user has permission to view will be returned.
   */
  async getChildPages<T = Models.Pagination<Models.ChildPage>>(
    parameters: Parameters.GetChildPages,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all child pages for given page id. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only pages that the user has permission to view will be returned.
   */
  async getChildPages<T = Models.Pagination<Models.ChildPage>>(
    parameters: Parameters.GetChildPages,
    callback?: never,
  ): Promise<T>;
  async getChildPages<T = Models.Pagination<Models.ChildPage>>(
    parameters: Parameters.GetChildPages,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/children`,
      method: 'GET',
      params: {
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
        'serialize-ids-as-strings': true,
      },
    };

    try {
      const childPages = await this.client.sendRequest<Models.Pagination<Models.ChildPage>>(config);
      const paginatedChildPages = this.paginationService.buildPaginatedResult(
        childPages,
        this.getChildPages.bind(this),
      );

      const responseHandler = this.client.getResponseHandler(callback);

      return responseHandler(paginatedChildPages as T);
    } catch (e: any) {
      const errorHandler = this.client.getErrorHandler(callback);

      return errorHandler(e);
    }
  }

  /** Fetches all child custom content. */
  async getAllChildCustomContent<T = Models.ChildCustomContent[]>(
    parameters: Parameters.GetChildCustomContent,
    callback: Callback<T>,
  ): Promise<void>;
  /** Fetches all child custom content. */
  async getAllChildCustomContent<T = Models.ChildCustomContent[]>(
    parameters: Parameters.GetChildCustomContent,
    callback?: never,
  ): Promise<T>;
  async getAllChildCustomContent<T = Models.ChildCustomContent[]>(
    parameters: Parameters.GetChildCustomContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    try {
      const { getAll: getAllChildCustomContent } = await this.getChildCustomContent(parameters);

      const childCustomContents = await getAllChildCustomContent();

      const responseHandler = this.client.getResponseHandler(callback);

      return responseHandler(childCustomContents as T);
    } catch (e: any) {
      const errorHandler = this.client.getErrorHandler(callback);

      return errorHandler(e);
    }
  }

  /**
   * Returns all child custom content for given custom content id. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only custom content that the user has permission to view will be returned.
   */
  async getChildCustomContent<T = Models.Pagination<Models.ChildCustomContent>>(
    parameters: Parameters.GetChildCustomContent,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all child custom content for given custom content id. The number of results is limited by the `limit`
   * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
   * response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only custom content that the user has permission to view will be returned.
   */
  async getChildCustomContent<T = Models.Pagination<Models.ChildCustomContent>>(
    parameters: Parameters.GetChildCustomContent,
    callback?: never,
  ): Promise<T>;
  async getChildCustomContent<T = Models.Pagination<Models.ChildCustomContent>>(
    parameters: Parameters.GetChildCustomContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.id}/children`,
      method: 'GET',
      params: {
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
        'serialize-ids-as-strings': true,
      },
    };

    try {
      const childCustomContents = await this.client.sendRequest<Models.Pagination<Models.ChildCustomContent>>(config);
      const paginatedChildCustomContents = this.paginationService.buildPaginatedResult(
        childCustomContents,
        this.getChildCustomContent.bind(this),
      );

      const responseHandler = this.client.getResponseHandler(callback);

      return responseHandler(paginatedChildCustomContents as T);
    } catch (e: any) {
      const errorHandler = this.client.getErrorHandler(callback);

      return errorHandler(e);
    }
  }
}
