import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

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
   */
  async convertContentBody<T = Models.ContentBody>(
    parameters: Parameters.ConvertContentBody,
    callback: Callback<T>
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
   */
  async convertContentBody<T = Models.ContentBody>(
    parameters: Parameters.ConvertContentBody,
    callback?: never
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
   * - Storage: export_view
   *
   * No other conversions are supported at the moment. Once a conversion is completed, it will be available for 5
   * minutes at the result endpoint.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   */
  async asyncConvertContentBodyRequest<T = Models.AsyncId>(
    parameters: Parameters.AsyncConvertContentBodyRequest,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Converts a content body from one format to another format asynchronously. Returns the asyncId for the asynchronous
   * task.
   *
   * Supported conversions:
   *
   * - Storage: export_view
   *
   * No other conversions are supported at the moment. Once a conversion is completed, it will be available for 5
   * minutes at the result endpoint.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   */
  async asyncConvertContentBodyRequest<T = Models.AsyncId>(
    parameters: Parameters.AsyncConvertContentBodyRequest,
    callback?: never
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
   * Returns the Asynchronous Content Body for the corresponding asyncId if the task is complete or returns the status
   * of the task.
   *
   * After the task is completed, the result can be obtained for 5 minutes, or until an identical conversion request is
   * made again, with allowCache query param set to false.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   */
  async asyncConvertContentBodyResponse<T = Models.AsyncContentBody>(
    parameters: Parameters.AsyncConvertContentBodyResponse,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the Asynchronous Content Body for the corresponding asyncId if the task is complete or returns the status
   * of the task.
   *
   * After the task is completed, the result can be obtained for 5 minutes, or until an identical conversion request is
   * made again, with allowCache query param set to false.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
   * 'View' permission for the space, and permission to view the content.
   */
  async asyncConvertContentBodyResponse<T = Models.AsyncContentBody>(
    parameters: Parameters.AsyncConvertContentBodyResponse,
    callback?: never
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
}
