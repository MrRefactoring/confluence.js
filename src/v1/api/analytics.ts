import { GetViewsSchema, type GetViews } from '../models/getViews';
import { GetViewersSchema, type GetViewers } from '../models/getViewers';
import type { GetViews as GetViewsParameters } from '../parameters/getViews';
import type { GetViewers as GetViewersParameters } from '../parameters/getViewers';
import type { Client, SendRequestOptions } from '#/core';

/** Get the total number of views a piece of content has. */
export async function getViews(client: Client, parameters: GetViewsParameters): Promise<GetViews> {
  const config: SendRequestOptions<GetViews> = {
    url: `/wiki/rest/api/analytics/content/${parameters.contentId}/views`,
    method: 'GET',
    searchParams: {
      fromDate: parameters.fromDate,
    },
    schema: GetViewsSchema,
  };

  return await client.sendRequest(config);
}

/** Get the total number of distinct viewers a piece of content has. */
export async function getViewers(client: Client, parameters: GetViewersParameters): Promise<GetViewers> {
  const config: SendRequestOptions<GetViewers> = {
    url: `/wiki/rest/api/analytics/content/${parameters.contentId}/viewers`,
    method: 'GET',
    searchParams: {
      fromDate: parameters.fromDate,
    },
    schema: GetViewersSchema,
  };

  return await client.sendRequest(config);
}
