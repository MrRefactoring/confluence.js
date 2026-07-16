import type * as Models from './models/index.js';
import type * as Parameters from './parameters/index.js';
import type { Client } from '../clients/index.js';
import type { Callback } from '../callback.js';
import type { RequestConfig } from '../requestConfig.js';

export class ContentBody {
  constructor(private client: Client) {}

  /**
   * Converts a content body from one format to another format.
   *
   * Supported conversions:
   *
   * - Storage: view, export_view, styled_view, editor
   * - Editor: storage
   * - View: none
   * - Export_view: none
   * - Styled_view: none
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   *
   * @deprecated Will be removed in next major version.
   */
  async convertContentBody<T = Models.ContentBody>(
    parameters: Parameters.ConvertContentBody,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Converts a content body from one format to another format.
   *
   * Supported conversions:
   *
   * - Storage: view, export_view, styled_view, editor
   * - Editor: storage
   * - View: none
   * - Export_view: none
   * - Styled_view: none
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   *
   * @deprecated Will be removed in next major version.
   */
  async convertContentBody<T = Models.ContentBody>(
    parameters: Parameters.ConvertContentBody,
    callback?: never,
  ): Promise<T>;
  async convertContentBody<T = Models.ContentBody>(
    parameters: Parameters.ConvertContentBody,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/contentbody/convert/${parameters.to}`,
      method: 'POST',
      params: {
        spaceKeyContext: parameters.spaceKeyContext,
        contentIdContext: parameters.contentIdContext,
        embeddedContentRender: parameters.embeddedContentRender,
        expand: parameters.expand,
      },
      data: {
        value: parameters.value,
        representation: parameters.representation,
        ...parameters.additionalProperties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Converts a content body from one format to another format asynchronously. Returns the asyncId for the asynchronous
   * task.
   *
   * Supported conversions:
   *
   * - Atlas_doc_format: editor, export_view, storage, styled_view, view
   * - Storage: atlas_doc_format, editor, export_view, styled_view, view
   * - Editor: storage
   *
   * No other conversions are supported at the moment. Once a conversion is completed, it will be available for 5
   * minutes at the result endpoint.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   */
  async asyncConvertContentBodyRequest<T = Models.AsyncId>(
    parameters: Parameters.AsyncConvertContentBodyRequest,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Converts a content body from one format to another format asynchronously. Returns the asyncId for the asynchronous
   * task.
   *
   * Supported conversions:
   *
   * - Atlas_doc_format: editor, export_view, storage, styled_view, view
   * - Storage: atlas_doc_format, editor, export_view, styled_view, view
   * - Editor: storage
   *
   * No other conversions are supported at the moment. Once a conversion is completed, it will be available for 5
   * minutes at the result endpoint.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   */
  async asyncConvertContentBodyRequest<T = Models.AsyncId>(
    parameters: Parameters.AsyncConvertContentBodyRequest,
    callback?: never,
  ): Promise<T>;
  async asyncConvertContentBodyRequest<T = Models.AsyncId>(
    parameters: Parameters.AsyncConvertContentBodyRequest,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/contentbody/convert/async/${parameters.to}`,
      method: 'POST',
      params: {
        spaceKeyContext: parameters.spaceKeyContext,
        contentIdContext: parameters.contentIdContext,
        allowCache: parameters.allowCache,
        embeddedContentRender: parameters.embeddedContentRender,
        expand: parameters.expand,
      },
      data: {
        value: parameters.value,
        representation: parameters.representation,
        ...parameters.additionalProperties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the asynchronous content body for the corresponding id if the task is complete or returns the status of the
   * task.
   *
   * After the task is completed, the result can be obtained for 5 minutes, or until an identical conversion request is
   * made again, with allowCache query param set to false.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   */
  async asyncConvertContentBodyResponse<T = Models.AsyncContentBody>(
    parameters: Parameters.AsyncConvertContentBodyResponse,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the asynchronous content body for the corresponding id if the task is complete or returns the status of the
   * task.
   *
   * After the task is completed, the result can be obtained for 5 minutes, or until an identical conversion request is
   * made again, with allowCache query param set to false.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   */
  async asyncConvertContentBodyResponse<T = Models.AsyncContentBody>(
    parameters: Parameters.AsyncConvertContentBodyResponse,
    callback?: never,
  ): Promise<T>;
  async asyncConvertContentBodyResponse<T = Models.AsyncContentBody>(
    parameters: Parameters.AsyncConvertContentBodyResponse,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/contentbody/convert/async/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the content body for the corresponding `asyncId` of a completed conversion task. If the task is not
   * completed, the task status is returned instead.
   *
   * Once a conversion task is completed, the result can be obtained for up to 5 minutes, or until an identical
   * conversion request is made again with the `allowCache` parameter set to false.
   *
   * Note that there is a maximum limit of 50 task results per request to this endpoint.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async bulkAsyncConvertContentBodyResponse<T = Models.AsyncContentBody[]>(
    parameters: Parameters.BulkAsyncConvertContentBodyResponse,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the content body for the corresponding `asyncId` of a completed conversion task. If the task is not
   * completed, the task status is returned instead.
   *
   * Once a conversion task is completed, the result can be obtained for up to 5 minutes, or until an identical
   * conversion request is made again with the `allowCache` parameter set to false.
   *
   * Note that there is a maximum limit of 50 task results per request to this endpoint.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async bulkAsyncConvertContentBodyResponse<T = Models.AsyncContentBody[]>(
    parameters: Parameters.BulkAsyncConvertContentBodyResponse,
    callback?: never,
  ): Promise<T>;
  async bulkAsyncConvertContentBodyResponse<T = Models.AsyncContentBody[]>(
    parameters: Parameters.BulkAsyncConvertContentBodyResponse,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/contentbody/convert/async/bulk/tasks',
      method: 'GET',
      params: {
        ids: parameters.ids,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Asynchronously converts content bodies from one format to another format in bulk. Use the Content body REST API to
   * get the status of conversion tasks. Note that there is a maximum limit of 10 conversions per request to this
   * endpoint.
   *
   * Supported conversions:
   *
   * - Storage: editor, export_view, styled_view, view
   * - Editor: storage
   *
   * Once a conversion task is completed, it is available for polling for up to 5 minutes.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if the `spaceKeyContext` or `contentIdContext` are present.
   */
  async bulkAsyncConvertContentBodyRequest<T = Models.AsyncId[]>(
    parameters: Parameters.BulkAsyncConvertContentBodyRequest,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Asynchronously converts content bodies from one format to another format in bulk. Use the Content body REST API to
   * get the status of conversion tasks. Note that there is a maximum limit of 10 conversions per request to this
   * endpoint.
   *
   * Supported conversions:
   *
   * - Storage: editor, export_view, styled_view, view
   * - Editor: storage
   *
   * Once a conversion task is completed, it is available for polling for up to 5 minutes.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if the `spaceKeyContext` or `contentIdContext` are present.
   */
  async bulkAsyncConvertContentBodyRequest<T = Models.AsyncId[]>(
    parameters: Parameters.BulkAsyncConvertContentBodyRequest,
    callback?: never,
  ): Promise<T>;
  async bulkAsyncConvertContentBodyRequest<T = Models.AsyncId[]>(
    parameters: Parameters.BulkAsyncConvertContentBodyRequest,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/contentbody/convert/async/bulk/tasks',
      method: 'POST',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }
}
