import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentBody {
  constructor(private client: Client) { }
  /**
     * Converts a content body from one format to another format.
     *
     * Supported conversions:
     *
     * - storage: view, export_view, styled_view, editor
     * - editor: storage
     * - view: none
     * - export_view: none
     * - styled_view: none
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * If request specifies 'contentIdContext', 'View' permission for the space, and permission to view the content. */
  async convertContentBody<T = Models.ContentBody>(parameters: Parameters.ConvertContentBody, callback: Callback<T>): Promise<void>;
  /**
     * Converts a content body from one format to another format.
     *
     * Supported conversions:
     *
     * - storage: view, export_view, styled_view, editor
     * - editor: storage
     * - view: none
     * - export_view: none
     * - styled_view: none
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * If request specifies 'contentIdContext', 'View' permission for the space, and permission to view the content. */
  async convertContentBody<T = Models.ContentBody>(parameters: Parameters.ConvertContentBody, callback?: never): Promise<T>;
  async convertContentBody<T = Models.ContentBody>(parameters: Parameters.ConvertContentBody, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/api/contentbody/convert/${parameters.to}`,
      method: 'POST',
      params: {
        spaceKeyContext: parameters.spaceKeyContext,
        contentIdContext: parameters.contentIdContext,
        embeddedContentRender: parameters.embeddedContentRender,
      },
      data: {
        value: parameters.value,
        representation: parameters.representation,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'convertContentBody' });
  }
}
