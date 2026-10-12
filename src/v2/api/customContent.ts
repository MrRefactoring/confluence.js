import {
  CustomContentByTypeInBlogPostSchema,
  type CustomContentByTypeInBlogPost,
} from '../models/customContentByTypeInBlogPost';
import { CustomContentByTypeSchema, type CustomContentByType } from '../models/customContentByType';
import { CustomContentSchema, type CustomContent } from '../models/customContent';
import { CustomContentByTypeInPageSchema, type CustomContentByTypeInPage } from '../models/customContentByTypeInPage';
import {
  CustomContentByTypeInSpaceSchema,
  type CustomContentByTypeInSpace,
} from '../models/customContentByTypeInSpace';
import type { GetCustomContentByTypeInBlogPost } from '../parameters/getCustomContentByTypeInBlogPost';
import type { GetCustomContentByType } from '../parameters/getCustomContentByType';
import type { CreateCustomContent } from '../parameters/createCustomContent';
import type { GetCustomContentById } from '../parameters/getCustomContentById';
import type { UpdateCustomContent } from '../parameters/updateCustomContent';
import type { DeleteCustomContent } from '../parameters/deleteCustomContent';
import type { GetCustomContentByTypeInPage } from '../parameters/getCustomContentByTypeInPage';
import type { GetCustomContentByTypeInSpace } from '../parameters/getCustomContentByTypeInSpace';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns all custom content for a given type within a given blogpost. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
 * container of the custom content (blog post), and the corresponding space.
 */
export async function getCustomContentByTypeInBlogPost(
  client: Client,
  parameters: GetCustomContentByTypeInBlogPost,
  options?: RequestOptions,
): Promise<CustomContentByTypeInBlogPost> {
  const config: SendRequestOptions<CustomContentByTypeInBlogPost> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/custom-content`,
    method: 'GET',
    searchParams: {
      type: parameters.type,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
      'body-format': parameters.bodyFormat,
    },
    schema: CustomContentByTypeInBlogPostSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all custom content for a given type. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
 * container of the custom content, and the corresponding space (if different from the container).
 */
export async function getCustomContentByType(
  client: Client,
  parameters: GetCustomContentByType,
  options?: RequestOptions,
): Promise<CustomContentByType> {
  const config: SendRequestOptions<CustomContentByType> = {
    url: '/wiki/api/v2/custom-content',
    method: 'GET',
    searchParams: {
      type: parameters.type,
      id: parameters.id,
      'space-id': parameters.spaceId,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
      'body-format': parameters.bodyFormat,
    },
    schema: CustomContentByTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new custom content in the given space, page, blogpost or other custom content.
 *
 * Only one of `spaceId`, `pageId`, `blogPostId`, or `customContentId` is required in the request body.
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space. Permission to create custom content in the space.
 */
export async function createCustomContent(
  client: Client,
  parameters: CreateCustomContent,
  options?: RequestOptions,
): Promise<CustomContent> {
  const config: SendRequestOptions<CustomContent> = {
    url: '/wiki/api/v2/custom-content',
    method: 'POST',
    body: parameters.body,
    schema: CustomContentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific piece of custom content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
 * container of the custom content, and the corresponding space (if different from the container).
 */
export async function getCustomContentById(
  client: Client,
  parameters: GetCustomContentById,
  options?: RequestOptions,
): Promise<CustomContent> {
  const config: SendRequestOptions<CustomContent> = {
    url: `/wiki/api/v2/custom-content/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      version: parameters.version,
      'include-labels': parameters.includeLabels,
      'include-properties': parameters.includeProperties,
      'include-operations': parameters.includeOperations,
      'include-versions': parameters.includeVersions,
      'include-version': parameters.includeVersion,
      'include-collaborators': parameters.includeCollaborators,
    },
    schema: CustomContentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Update a custom content by id. At most one of `spaceId`, `pageId`, `blogPostId`, or `customContentId` is allowed in
 * the request body. Note that if `spaceId` is specified, it must be the same as the `spaceId` used for creating the
 * custom content as moving custom content to a different space is not supported.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page or
 * blogpost and its corresponding space. Permission to update custom content in the space.
 */
export async function updateCustomContent(
  client: Client,
  parameters: UpdateCustomContent,
  options?: RequestOptions,
): Promise<CustomContent> {
  const config: SendRequestOptions<CustomContent> = {
    url: `/wiki/api/v2/custom-content/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: CustomContentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a custom content by id.
 *
 * Deleting a custom content will either move it to the trash or permanently delete it (purge it), depending on the
 * apiSupport. To permanently delete a **trashed** custom content, the endpoint must be called with the following param
 * `purge=true`.
 *
 * **[Permissions](https://support.atlassian.com/confluence-cloud/docs/what-are-confluences-roles/) required**:
 * Permission to view the content of the page or blogpost and its corresponding space. Permission to delete custom
 * content in the space.
 * [`manage/content`](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space-permissions/#api-space-permissions-get)
 * permission for the space (if attempting to purge).
 *
 * **Note:** To find the display name for each permission ID, call the [Get available space
 * permissions](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space-permissions/#api-space-permissions-get)
 * API.
 */
export async function deleteCustomContent(
  client: Client,
  parameters: DeleteCustomContent,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/custom-content/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      purge: parameters.purge,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all custom content for a given type within a given page. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content, the
 * container of the custom content (page), and the corresponding space.
 */
export async function getCustomContentByTypeInPage(
  client: Client,
  parameters: GetCustomContentByTypeInPage,
  options?: RequestOptions,
): Promise<CustomContentByTypeInPage> {
  const config: SendRequestOptions<CustomContentByTypeInPage> = {
    url: `/wiki/api/v2/pages/${parameters.id}/custom-content`,
    method: 'GET',
    searchParams: {
      type: parameters.type,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
      'body-format': parameters.bodyFormat,
    },
    schema: CustomContentByTypeInPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all custom content for a given type within a given space. The number of results is limited by the `limit`
 * parameter and additional results (if available) will be available through the `next` URL present in the `Link`
 * response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and the
 * corresponding space.
 */
export async function getCustomContentByTypeInSpace(
  client: Client,
  parameters: GetCustomContentByTypeInSpace,
  options?: RequestOptions,
): Promise<CustomContentByTypeInSpace> {
  const config: SendRequestOptions<CustomContentByTypeInSpace> = {
    url: `/wiki/api/v2/spaces/${parameters.id}/custom-content`,
    method: 'GET',
    searchParams: {
      type: parameters.type,
      cursor: parameters.cursor,
      limit: parameters.limit,
      'body-format': parameters.bodyFormat,
    },
    schema: CustomContentByTypeInSpaceSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
