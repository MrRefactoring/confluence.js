import { LabelArraySchema, type LabelArray } from '../models/labelArray';
import type { AddLabelsToContent } from '../parameters/addLabelsToContent';
import type { RemoveLabelFromContentUsingQueryParameter } from '../parameters/removeLabelFromContentUsingQueryParameter';
import type { RemoveLabelFromContent } from '../parameters/removeLabelFromContent';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Adds labels to a piece of content. Does not modify the existing labels.
 *
 * Notes:
 *
 * - Labels can also be added when creating content ([Create content](#api-content-post)).
 * - Labels can be updated when updating content ([Update content](#api-content-id-put)). This will delete the existing
 *   labels and replace them with the labels in the request.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function addLabelsToContent(client: Client, parameters: AddLabelsToContent): Promise<LabelArray> {
  const config: SendRequestOptions<LabelArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/label`,
    method: 'POST',
    body: parameters.body,
    schema: LabelArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Removes a label from a piece of content. Labels can't be deleted from archived content. This is similar to [Remove
 * label from content](#api-content-id-label-label-delete) except that the label name is specified via a query
 * parameter.
 *
 * Use this method if the label name has "/" characters, as [Remove label from content using query
 * parameter](#api-content-id-label-delete) does not accept "/" characters for the label name.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function removeLabelFromContentUsingQueryParameter(
  client: Client,
  parameters: RemoveLabelFromContentUsingQueryParameter,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/label`,
    method: 'DELETE',
    searchParams: {
      name: parameters.name,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Removes a label from a piece of content. Labels can't be deleted from archived content. This is similar to [Remove
 * label from content using query parameter](#api-content-id-label-delete) except that the label name is specified via a
 * path parameter.
 *
 * Use this method if the label name does not have "/" characters, as the path parameter does not accept "/" characters
 * for security reasons. Otherwise, use [Remove label from content using query
 * parameter](#api-content-id-label-delete).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
 */
export async function removeLabelFromContent(client: Client, parameters: RemoveLabelFromContent): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/content/${parameters.id}/label/${parameters.label}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
