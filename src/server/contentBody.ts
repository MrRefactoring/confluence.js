import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentBody {
  constructor(private client: Client) {}

  /**
   * Converts between content body representations. Not all representations can be converted to/from other formats.
   * Supported conversions:
   *
   *                                  Source RepresentationDestination Representation Supported
   *
   *
   *              storageview,export_view,styled_view,editor
   *              editorstorage
   *              viewNone
   *              export_viewNone
   *              styled_viewNone
   *
   * @example
   *   Example request URI(s):
   *
   *   http://example.com/rest/api/contentbody/convert/view
   */
  async convert<T = unknown>(parameters: Parameters.Convert, callback: Callback<T>): Promise<void>;
  /**
   * Converts between content body representations. Not all representations can be converted to/from other formats.
   * Supported conversions:
   *
   *                                  Source RepresentationDestination Representation Supported
   *
   *
   *              storageview,export_view,styled_view,editor
   *              editorstorage
   *              viewNone
   *              export_viewNone
   *              styled_viewNone
   *
   * @example
   *   Example request URI(s):
   *
   *   http://example.com/rest/api/contentbody/convert/view
   */
  async convert<T = unknown>(parameters: Parameters.Convert, callback?: never): Promise<T>;
  async convert<T = unknown>(parameters: Parameters.Convert, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/contentbody/convert/${parameters.to}`,
      method: 'POST',
      params: {
        storage: parameters?.storage,
        editor: parameters?.editor,
        view: parameters?.view,
        export_view: parameters?.export.view,
        styled_view: parameters?.styled.view,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'convert' });
  }
}
