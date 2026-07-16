import { AsyncIdSchema, type AsyncId } from '../models/asyncId';
import { AsyncContentBodySchema, type AsyncContentBody } from '../models/asyncContentBody';
import { AsyncContentBodyArraySchema, type AsyncContentBodyArray } from '../models/asyncContentBodyArray';
import { AsyncIdArraySchema, type AsyncIdArray } from '../models/asyncIdArray';
import type { AsyncConvertContentBodyRequest } from '../parameters/asyncConvertContentBodyRequest';
import type { AsyncConvertContentBodyResponse } from '../parameters/asyncConvertContentBodyResponse';
import type { BulkAsyncConvertContentBodyResponse } from '../parameters/bulkAsyncConvertContentBodyResponse';
import type { BulkAsyncConvertContentBodyRequest } from '../parameters/bulkAsyncConvertContentBodyRequest';
import type { Client, SendRequestOptions } from '#/core';

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
 * No other conversions are supported at the moment. Once a conversion is completed, it will be available for 5 minutes
 * at the result endpoint.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
 * 'View' permission for the space, and permission to view the content.
 */
export async function asyncConvertContentBodyRequest(
  client: Client,
  parameters: AsyncConvertContentBodyRequest,
): Promise<AsyncId> {
  const config: SendRequestOptions<AsyncId> = {
    url: `/wiki/rest/api/contentbody/convert/async/${parameters.to}`,
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
      spaceKeyContext: parameters.spaceKeyContext,
      contentIdContext: parameters.contentIdContext,
      allowCache: parameters.allowCache,
      embeddedContentRender: parameters.embeddedContentRender,
    },
    body: {
      value: parameters.value,
      representation: parameters.representation,
    },
    schema: AsyncIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the content body for the corresponding `asyncId` of a completed conversion task. If the task is not
 * completed, the task status is returned instead.
 *
 * Once a conversion task is completed, the result can be obtained for up to 5 minutes, or until an identical conversion
 * request is made again with the `allowCache` parameter set to false.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: If request specifies 'contentIdContext',
 * 'View' permission for the space, and permission to view the content.
 */
export async function asyncConvertContentBodyResponse(
  client: Client,
  parameters: AsyncConvertContentBodyResponse,
): Promise<AsyncContentBody> {
  const config: SendRequestOptions<AsyncContentBody> = {
    url: `/wiki/rest/api/contentbody/convert/async/${parameters.id}`,
    method: 'GET',
    schema: AsyncContentBodySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the content body for the corresponding `asyncId` of a completed conversion task. If the task is not
 * completed, the task status is returned instead.
 *
 * Once a conversion task is completed, the result can be obtained for up to 5 minutes, or until an identical conversion
 * request is made again with the `allowCache` parameter set to false.
 *
 * Note that there is a maximum limit of 50 task results per request to this endpoint.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function bulkAsyncConvertContentBodyResponse(
  client: Client,
  parameters: BulkAsyncConvertContentBodyResponse,
): Promise<AsyncContentBodyArray> {
  const config: SendRequestOptions<AsyncContentBodyArray> = {
    url: '/wiki/rest/api/contentbody/convert/async/bulk/tasks',
    method: 'GET',
    searchParams: {
      ids: parameters.ids,
    },
    schema: AsyncContentBodyArraySchema,
  };

  return await client.sendRequest(config);
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
export async function bulkAsyncConvertContentBodyRequest(
  client: Client,
  parameters: BulkAsyncConvertContentBodyRequest,
): Promise<AsyncIdArray> {
  const config: SendRequestOptions<AsyncIdArray> = {
    url: '/wiki/rest/api/contentbody/convert/async/bulk/tasks',
    method: 'POST',
    body: {
      conversionInputs: parameters.conversionInputs,
    },
    schema: AsyncIdArraySchema,
  };

  return await client.sendRequest(config);
}
