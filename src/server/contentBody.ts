import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ContentBody {
  constructor(private client: Client) {}

  /**
   * Converts between content body representations. Not all representations can be converted to/from other formats.
   * Supported conversions:
   *
   * - Storageview, export_view, styled_view, editor
   * - Editorstorage
   * - ViewNone
   * - Export_viewNone
   * - Styled_viewNone
   */
  async convertContentBody<T = Models.ContentBody>(
    parameters: Parameters.ConvertContentBody,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Converts between content body representations. Not all representations can be converted to/from other formats.
   * Supported conversions:
   *
   * - Storageview, export_view, styled_view, editor
   * - Editorstorage
   * - ViewNone
   * - Export_viewNone
   * - Styled_viewNone
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
      url: `/rest/api/contentbody/convert/${parameters.to}`,
      method: 'POST',
      params: {
        storage: parameters.storage,
        editor: parameters.editor,
        view: parameters.view,
        export_view: parameters.exportView,
        styled_view: parameters.styledView,
        expand: parameters.expand,
      },
      data: {
        ...parameters,
        to: undefined,
        storage: undefined,
        editor: undefined,
        view: undefined,
        export_view: undefined,
        styled_view: undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
