import { LongTaskSchema, type LongTask } from '../models/longTask';
import { LabelArraySchema, type LabelArray } from '../models/labelArray';
import type { DeletePageTree } from '../parameters/deletePageTree';
import type { GetLabelsForSpace } from '../parameters/getLabelsForSpace';
import type { AddLabelsToSpace } from '../parameters/addLabelsToSpace';
import type { DeleteLabelFromSpace } from '../parameters/deleteLabelFromSpace';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Moves a pagetree rooted at a page to the space's trash:
 *
 * - If the content's type is `page` and its status is `current`, it will be trashed including all its descendants.
 * - For every other combination of content type and status, this API is not supported.
 *
 * This API accepts the pageTree delete request and returns a task ID. The delete process happens asynchronously.
 *
 * Response example: <pre><code> { "id" : "1180606", "links" : { "status" : "/rest/api/longtask/1180606" } }
 * </code></pre>
 *
 * Use the `/longtask/<taskId>` REST API to get the copy task status.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Delete' permission for the space that the
 * content is in.
 */
export async function deletePageTree(client: Client, parameters: DeletePageTree): Promise<LongTask> {
  const config: SendRequestOptions<LongTask> = {
    url: `/wiki/rest/api/content/${parameters.id}/pageTree`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    schema: LongTaskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of labels associated with a space. Can provide a prefix as well as other filters to select different
 * types of labels.
 */
export async function getLabelsForSpace(client: Client, parameters: GetLabelsForSpace): Promise<LabelArray> {
  const config: SendRequestOptions<LabelArray> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/label`,
    method: 'GET',
    searchParams: {
      prefix: parameters.prefix,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: LabelArraySchema,
  };

  return await client.sendRequest(config);
}

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
export async function addLabelsToSpace(client: Client, parameters: AddLabelsToSpace): Promise<LabelArray> {
  const config: SendRequestOptions<LabelArray> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/label`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: parameters.body,
    schema: LabelArraySchema,
  };

  return await client.sendRequest(config);
}

export async function deleteLabelFromSpace(client: Client, parameters: DeleteLabelFromSpace): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/label`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      name: parameters.name,
      prefix: parameters.prefix,
    },
  };

  return await client.sendRequest(config);
}
