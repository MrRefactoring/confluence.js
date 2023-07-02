import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { PaginationService } from '../services';
import { RequestConfig } from '../requestConfig';

export class Page {
  private paginationService = new PaginationService();

  constructor(private client: Client) {}

  /**
   * Returns the pages of specified label. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getLabelPages<T = Models.Pagination<Models.Page>>(
    parameters: Parameters.GetLabelPages,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the pages of specified label. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getLabelPages<T = Models.Pagination<Models.Page>>(
    parameters: Parameters.GetLabelPages,
    callback?: never,
  ): Promise<T>;
  async getLabelPages<T = Models.Pagination<Models.Page>>(
    parameters: Parameters.GetLabelPages,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/labels/${parameters.id}/pages`,
      method: 'GET',
      params: {
        'body-format': parameters.bodyFormat,
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': true,
      },
    };

    try {
      const pages = await this.client.sendRequest<Models.Pagination<Models.Page>>(config);
      const paginatedPages = this.paginationService.buildPaginatedResult(pages, this.getLabelPages.bind(this));

      const responseHandler = this.client.getResponseHandler(callback);

      return responseHandler(paginatedPages as T);
    } catch (e: any) {
      const errorHandler = this.client.getErrorHandler(callback);

      return errorHandler(e);
    }
  }

  /**
   * Returns all pages. The number of results is limited by the `limit` parameter and additional results (if available)
   * will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only pages that the user has permission to view will be returned.
   */
  async getPages<T = Models.Pagination<Models.Page>>(
    parameters: Parameters.GetPages | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all pages. The number of results is limited by the `limit` parameter and additional results (if available)
   * will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only pages that the user has permission to view will be returned.
   */
  async getPages<T = Models.Pagination<Models.Page>>(parameters?: Parameters.GetPages, callback?: never): Promise<T>;
  async getPages<T = Models.Pagination<Models.Page>>(
    parameters?: Parameters.GetPages,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/pages',
      method: 'GET',
      params: {
        id: parameters?.id,
        status: parameters?.status,
        'body-format': parameters?.bodyFormat,
        cursor: parameters?.cursor,
        limit: parameters?.limit,
        'serialize-ids-as-strings': true,
      },
    };

    try {
      const pages = await this.client.sendRequest<Models.Pagination<Models.Page>>(config);
      const paginatedPages = this.paginationService.buildPaginatedResult(pages, this.getPages.bind(this));

      const responseHandler = this.client.getResponseHandler(callback);

      return responseHandler(paginatedPages as T);
    } catch (e: any) {
      const errorHandler = this.client.getErrorHandler(callback);

      return errorHandler(e);
    }
  }

  /**
   * Creates a page in the space.
   *
   * Pages are created as published by default unless specified as a draft in the status field. If creating a published
   * page, the title must be specified.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the corresponding space.
   * Permission to create a page in the space.
   */
  async createPage<T = Models.Page>(
    parameters: Parameters.CreatePage | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a page in the space.
   *
   * Pages are created as published by default unless specified as a draft in the status field. If creating a published
   * page, the title must be specified.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the corresponding space.
   * Permission to create a page in the space.
   */
  async createPage<T = Models.Page>(parameters?: Parameters.CreatePage, callback?: never): Promise<T>;
  async createPage<T = Models.Page>(parameters?: Parameters.CreatePage, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/pages',
      method: 'POST',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a specific page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
   * corresponding space.
   */
  async getPageById<T = Models.Page>(parameters: Parameters.GetPageById, callback: Callback<T>): Promise<void>;
  /**
   * Returns a specific page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
   * corresponding space.
   */
  async getPageById<T = Models.Page>(parameters: Parameters.GetPageById, callback?: never): Promise<T>;
  async getPageById<T = Models.Page>(parameters: Parameters.GetPageById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}`,
      method: 'GET',
      params: {
        'body-format': parameters.bodyFormat,
        'get-draft': parameters.getDraft,
        version: parameters.version,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a page by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
   * corresponding space. Permission to update pages in the space.
   */
  async updatePage<T = Models.Page>(parameters: Parameters.UpdatePage, callback: Callback<T>): Promise<void>;
  /**
   * Update a page by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
   * corresponding space. Permission to update pages in the space.
   */
  async updatePage<T = Models.Page>(parameters: Parameters.UpdatePage, callback?: never): Promise<T>;
  async updatePage<T = Models.Page>(parameters: Parameters.UpdatePage, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete a page by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
   * corresponding space. Permission to delete pages in the space.
   */
  async deletePage<T = void>(parameters: Parameters.DeletePage, callback: Callback<T>): Promise<void>;
  /**
   * Delete a page by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
   * corresponding space. Permission to delete pages in the space.
   */
  async deletePage<T = void>(parameters: Parameters.DeletePage, callback?: never): Promise<T>;
  async deletePage<T = void>(parameters: Parameters.DeletePage, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all pages in a space. The number of results is limited by the `limit` parameter and additional results (if
   * available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'View' permission for the space. Only pages that the user has permission to view
   * will be returned.
   */
  async getPagesInSpace<T = Models.Pagination<Models.Page>>(
    parameters: Parameters.GetPagesInSpace,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all pages in a space. The number of results is limited by the `limit` parameter and additional results (if
   * available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and 'View' permission for the space. Only pages that the user has permission to view
   * will be returned.
   */
  async getPagesInSpace<T = Models.Pagination<Models.Page>>(
    parameters: Parameters.GetPagesInSpace,
    callback?: never,
  ): Promise<T>;
  async getPagesInSpace<T = Models.Pagination<Models.Page>>(
    parameters: Parameters.GetPagesInSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.id}/pages`,
      method: 'GET',
      params: {
        status: parameters.status,
        'body-format': parameters.bodyFormat,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': true,
      },
    };

    try {
      const pages = await this.client.sendRequest<Models.Pagination<Models.Page>>(config);
      const paginatedPages = this.paginationService.buildPaginatedResult(pages, this.getPagesInSpace.bind(this));

      const responseHandler = this.client.getResponseHandler(callback);

      return responseHandler(paginatedPages as T);
    } catch (e: any) {
      const errorHandler = this.client.getErrorHandler(callback);

      return errorHandler(e);
    }
  }
}
