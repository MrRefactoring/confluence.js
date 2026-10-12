import { LabelDetailsSchema, type LabelDetails } from '../models/labelDetails';
import type { GetAllLabelContent } from '../parameters/getAllLabelContent';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns label information and a list of contents associated with the label.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only contents that the user is permitted to view is returned.
 */
export async function getAllLabelContent(
  client: Client,
  parameters: GetAllLabelContent,
  options?: RequestOptions,
): Promise<LabelDetails> {
  const config: SendRequestOptions<LabelDetails> = {
    url: '/wiki/rest/api/label',
    method: 'GET',
    searchParams: {
      name: parameters.name,
      type: parameters.type,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: LabelDetailsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
