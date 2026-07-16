import { ContentStateResponseSchema, type ContentStateResponse } from '../models/contentStateResponse';
import { AvailableContentStatesSchema, type AvailableContentStates } from '../models/availableContentStates';
import { ContentStateSchema, type ContentState } from '../models/contentState';
import { ContentStateSettingsSchema, type ContentStateSettings } from '../models/contentStateSettings';
import { ContentArraySchema, type ContentArray } from '../models/contentArray';
import type { GetContentState } from '../parameters/getContentState';
import type { SetContentState } from '../parameters/setContentState';
import type { RemoveContentState } from '../parameters/removeContentState';
import type { GetAvailableContentStates } from '../parameters/getAvailableContentStates';
import type { GetSpaceContentStates } from '../parameters/getSpaceContentStates';
import type { GetContentStateSettings } from '../parameters/getContentStateSettings';
import type { GetContentsWithState } from '../parameters/getContentsWithState';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Gets the current content state of the draft or current version of content. To specify the draft version, set the
 * parameter status to draft, otherwise archived or current will get the relevant published state.
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
 */
export async function getContentState(client: Client, parameters: GetContentState): Promise<ContentStateResponse> {
  const config: SendRequestOptions<ContentStateResponse> = {
    url: `/wiki/rest/api/content/${parameters.id}/state`,
    method: 'GET',
    searchParams: {
      status: parameters.status,
    },
    schema: ContentStateResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the content state of the content specified and creates a new version (publishes the content without changing the
 * body) of the content with the new state.
 *
 * You may pass in either an id of a state, or the name and color of a desired new state. If all 3 are passed in, id
 * will be used. If the name and color passed in already exist under the current user's existing custom states, the
 * existing state will be reused. If custom states are disabled in the space of the content (which can be determined by
 * getting the content state space settings of the content's space) then this set will fail.
 *
 * You may not remove a content state via this PUT request. You must use the DELETE method. A specified state is
 * required in the body of this request.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function setContentState(client: Client, parameters: SetContentState): Promise<ContentStateResponse> {
  const config: SendRequestOptions<ContentStateResponse> = {
    url: `/wiki/rest/api/content/${parameters.id}/state`,
    method: 'PUT',
    searchParams: {
      status: parameters.status,
    },
    body: {
      name: parameters.name,
      color: parameters.color,
      id: parameters.id,
    },
    schema: ContentStateResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Removes the content state of the content specified and creates a new version (publishes the content without changing
 * the body) of the content with the new status.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function removeContentState(
  client: Client,
  parameters: RemoveContentState,
): Promise<ContentStateResponse> {
  const config: SendRequestOptions<ContentStateResponse> = {
    url: `/wiki/rest/api/content/${parameters.id}/state`,
    method: 'DELETE',
    searchParams: {
      status: parameters.status,
    },
    schema: ContentStateResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Gets content states that are available for the content to be set as. Will return all enabled Space Content States.
 * Will only return most the 3 most recently published custom content states to match UI editor list. To get all custom
 * content states, use the /content-states endpoint.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
 */
export async function getAvailableContentStates(
  client: Client,
  parameters: GetAvailableContentStates,
): Promise<AvailableContentStates> {
  const config: SendRequestOptions<AvailableContentStates> = {
    url: `/wiki/rest/api/content/${parameters.id}/state/available`,
    method: 'GET',
    schema: AvailableContentStatesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Get custom content states that authenticated user has created.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required** Must have user authentication.
 */
export async function getCustomContentStates(client: Client): Promise<ContentState[]> {
  const config: SendRequestOptions<ContentState[]> = {
    url: '/wiki/rest/api/content-states',
    method: 'GET',
    schema: z.array(ContentStateSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Get content states that are suggested in the space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space.
 */
export async function getSpaceContentStates(
  client: Client,
  parameters: GetSpaceContentStates,
): Promise<ContentState[]> {
  const config: SendRequestOptions<ContentState[]> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/state`,
    method: 'GET',
    schema: z.array(ContentStateSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Get object describing whether content states are allowed at all, if custom content states or space content states are
 * restricted, and a list of space content states allowed for the space if they are not restricted.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space.
 */
export async function getContentStateSettings(
  client: Client,
  parameters: GetContentStateSettings,
): Promise<ContentStateSettings> {
  const config: SendRequestOptions<ContentStateSettings> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/state/settings`,
    method: 'GET',
    schema: ContentStateSettingsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all content that has the provided content state in a space.
 *
 * If the expand query parameter is used with the `body.export_view` and/or `body.styled_view` properties, then the
 * query limit parameter will be restricted to a maximum value of 25.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space.
 */
export async function getContentsWithState(client: Client, parameters: GetContentsWithState): Promise<ContentArray> {
  const config: SendRequestOptions<ContentArray> = {
    url: `/wiki/rest/api/space/${parameters.spaceKey}/state/content`,
    method: 'GET',
    searchParams: {
      'state-id': parameters['state-id'],
      expand: parameters.expand,
      limit: parameters.limit,
      start: parameters.start,
    },
    schema: ContentArraySchema,
  };

  return await client.sendRequest(config);
}
