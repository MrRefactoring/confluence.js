import { MovePageSchema, type MovePage } from '../models/movePage';
import { ContentChildrenSchema, type ContentChildren } from '../models/contentChildren';
import { ContentArraySchema, type ContentArray } from '../models/contentArray';
import { LongTaskSchema, type LongTask } from '../models/longTask';
import type { MovePage as MovePageParameters } from '../parameters/movePage';
import type { GetContentDescendants } from '../parameters/getContentDescendants';
import type { GetDescendantsOfType } from '../parameters/getDescendantsOfType';
import type { CopyPageHierarchy } from '../parameters/copyPageHierarchy';
import type { CopyPage } from '../parameters/copyPage';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Move a page to a new location relative to a target page:
 *
 * - `before` - move the page under the same parent as the target, before the target in the list of children
 * - `after` - move the page under the same parent as the target, after the target in the list of children
 * - `append` - move the page to be a child of the target
 *
 * Caution: This API can move pages to the top level of a space. Top-level pages are difficult to find in the UI because
 * they do not show up in the page tree display. To avoid this, never use `before` or `after` positions when the
 * `targetId` is a top-level page.
 */
export async function movePage(client: Client, parameters: MovePageParameters): Promise<MovePage> {
  const config: SendRequestOptions<MovePage> = {
    url: `/wiki/rest/api/content/${parameters.pageId}/move/${parameters.position}/${parameters.targetId}`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    schema: MovePageSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a map of the descendants of a piece of content. This is similar to [Get content
 * children](#api-content-id-child-get), except that this method returns child pages at all levels, rather than just the
 * direct child pages.
 *
 * A piece of content has different types of descendants, depending on its type:
 *
 * - `page`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `whiteboard`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `database`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `embed`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `folder`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `blogpost`: descendant is `comment`, `attachment`
 * - `attachment`: descendant is `comment`
 * - `comment`: descendant is `attachment`
 *
 * The map will always include all descendant types that are valid for the content. However, if the content has no
 * instances of a descendant type, the map will contain an empty array for that descendant type.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
 * permission to view the content if it is a page.
 */
export async function getContentDescendants(
  client: Client,
  parameters: GetContentDescendants,
): Promise<ContentChildren> {
  const config: SendRequestOptions<ContentChildren> = {
    url: `/wiki/rest/api/content/${parameters.id}/descendant`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: ContentChildrenSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all descendants of a given type, for a piece of content. This is similar to [Get content children by
 * type](#api-content-id-child-type-get), except that this method returns child pages at all levels, rather than just
 * the direct child pages.
 *
 * A piece of content has different types of descendants, depending on its type:
 *
 * - `page`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `whiteboard`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `database`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `embed`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `folder`: descendant is `page`, `whiteboard`, `database`, `embed`, `folder`, `comment`, `attachment`
 * - `blogpost`: descendant is `comment`, `attachment`
 * - `attachment`: descendant is `comment`
 * - `comment`: descendant is `attachment`
 *
 * Custom content types that are provided by apps can also be returned.
 *
 * If the expand query parameter is used with the `body.export_view` and/or `body.styled_view` properties, then the
 * query limit parameter will be restricted to a maximum value of 25.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
 * permission to view the content if it is a page.
 */
export async function getDescendantsOfType(client: Client, parameters: GetDescendantsOfType): Promise<ContentArray> {
  const config: SendRequestOptions<ContentArray> = {
    url: `/wiki/rest/api/content/${parameters.id}/descendant/${parameters.type}`,
    method: 'GET',
    searchParams: {
      depth: parameters.depth,
      expand: parameters.expand,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: ContentArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Copy page hierarchy allows the copying of an entire hierarchy of pages and their associated properties, permissions
 * and attachments. The id path parameter refers to the content id of the page to copy, and the new parent of this
 * copied page is defined using the destinationPageId in the request body. The titleOptions object defines the rules of
 * renaming page titles during the copy; for example, search and replace can be used in conjunction to rewrite the
 * copied page titles.
 *
 * Response example: <pre><code> { "id" : "1180606", "links" : { "status" : "/rest/api/longtask/1180606" } }
 * </code></pre>
 *
 * Use the /longtask/<taskId> REST API to get the copy task status.
 */
export async function copyPageHierarchy(client: Client, parameters: CopyPageHierarchy): Promise<LongTask> {
  const config: SendRequestOptions<LongTask> = {
    url: `/wiki/rest/api/content/${parameters.id}/pagehierarchy/copy`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      copyAttachments: parameters.copyAttachments,
      copyPermissions: parameters.copyPermissions,
      copyProperties: parameters.copyProperties,
      copyLabels: parameters.copyLabels,
      copyCustomContents: parameters.copyCustomContents,
      copyDescendants: parameters.copyDescendants,
      destinationPageId: parameters.destinationPageId,
      titleOptions: parameters.titleOptions,
    },
    schema: LongTaskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Copies a single page and its associated properties, permissions, attachments, and custom contents. The `id` path
 * parameter refers to the content ID of the page to copy. The target of the page to be copied is defined using the
 * `destination` in the request body and can be one of the following types.
 *
 * - `space`: page will be copied to the specified space as a root page on the space
 * - `parent_page`: page will be copied as a child of the specified parent page
 * - `parent_content`: page will be copied as a child of the specified parent content
 * - `existing_page`: page will be copied and replace the specified page
 *
 * By default, the following objects are expanded: `space`, `history`, `version`.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Add' permission for the space that the
 * content will be copied in and permission to update the content if copying to an `existing_page`.
 */
export async function copyPage(client: Client, parameters: CopyPage): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/wiki/rest/api/content/${parameters.id}/copy`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      copyAttachments: parameters.copyAttachments,
      copyPermissions: parameters.copyPermissions,
      copyProperties: parameters.copyProperties,
      copyLabels: parameters.copyLabels,
      copyCustomContents: parameters.copyCustomContents,
      destination: parameters.destination,
      pageTitle: parameters.pageTitle,
      body: parameters.body,
    },
  };

  return await client.sendRequest(config);
}
