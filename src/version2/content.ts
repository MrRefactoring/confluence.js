import * as Models from './models';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Content {
  constructor(private client: Client) {}

  /**
   * Converts a list of content ids into their associated content types. This is useful for users migrating from v1 to
   * v2 who may have stored just content ids without their associated type. This will return types as they should be
   * used in v2. Notably, this will return `inline-comment` for inline comments and `footer-comment` for footer
   * comments, which is distinct from them both being represented by `comment` in v1.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the requested content.
   * Any content that the user does not have permission to view or does not exist will map to `null` in the response.
   */
  async convertContentIdsToContentTypes<T = Models.ContentIdToContentTypeResponse>(
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Converts a list of content ids into their associated content types. This is useful for users migrating from v1 to
   * v2 who may have stored just content ids without their associated type. This will return types as they should be
   * used in v2. Notably, this will return `inline-comment` for inline comments and `footer-comment` for footer
   * comments, which is distinct from them both being represented by `comment` in v1.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the requested content.
   * Any content that the user does not have permission to view or does not exist will map to `null` in the response.
   */
  async convertContentIdsToContentTypes<T = Models.ContentIdToContentTypeResponse>(callback?: never): Promise<T>;
  async convertContentIdsToContentTypes<T = Models.ContentIdToContentTypeResponse>(
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/content/convert-ids-to-types',
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }
}
