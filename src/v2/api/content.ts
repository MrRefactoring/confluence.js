import { ContentIdToContentTypeSchema, type ContentIdToContentType } from '../models/contentIdToContentType';
import type { ConvertContentIdsToContentTypes } from '../parameters/convertContentIdsToContentTypes';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Converts a list of content ids into their associated content types. This is useful for users migrating from v1 to v2
 * who may have stored just content ids without their associated type. This will return types as they should be used in
 * v2. Notably, this will return `inline-comment` for inline comments and `footer-comment` for footer comments, which is
 * distinct from them both being represented by `comment` in v1.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the requested content. Any
 * content that the user does not have permission to view or does not exist will map to `null` in the response.
 */
export async function convertContentIdsToContentTypes(
  client: Client,
  parameters: ConvertContentIdsToContentTypes,
): Promise<ContentIdToContentType> {
  const config: SendRequestOptions<ContentIdToContentType> = {
    url: '/wiki/api/v2/content/convert-ids-to-types',
    method: 'POST',
    body: parameters.body,
    schema: ContentIdToContentTypeSchema,
  };

  return await client.sendRequest(config);
}
