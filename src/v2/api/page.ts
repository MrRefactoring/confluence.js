import { LabelPagesSchema, type LabelPages } from '../models/labelPages';
import { PagesSchema, type Pages } from '../models/pages';
import { PageSchema, type Page } from '../models/page';
import { PagesInSpaceSchema, type PagesInSpace } from '../models/pagesInSpace';
import type { GetLabelPages } from '../parameters/getLabelPages';
import type { GetPages } from '../parameters/getPages';
import type { CreatePage } from '../parameters/createPage';
import type { GetPageById } from '../parameters/getPageById';
import type { UpdatePage } from '../parameters/updatePage';
import type { DeletePage } from '../parameters/deletePage';
import type { UpdatePageTitle } from '../parameters/updatePageTitle';
import type { GetPagesInSpace } from '../parameters/getPagesInSpace';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the pages of specified label. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space.
 */
export async function getLabelPages(client: Client, parameters: GetLabelPages): Promise<LabelPages> {
  const config: SendRequestOptions<LabelPages> = {
    url: `/wiki/api/v2/labels/${parameters.id}/pages`,
    method: 'GET',
    searchParams: {
      'space-id': parameters.spaceId,
      'body-format': parameters.bodyFormat,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: LabelPagesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all pages. The number of results is limited by the `limit` parameter and additional results (if available)
 * will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only pages that the user has permission to view will be returned.
 */
export async function getPages(client: Client, parameters?: GetPages): Promise<Pages> {
  const config: SendRequestOptions<Pages> = {
    url: '/wiki/api/v2/pages',
    method: 'GET',
    searchParams: {
      id: parameters?.id,
      'space-id': parameters?.spaceId,
      sort: parameters?.sort,
      status: parameters?.status,
      title: parameters?.title,
      'body-format': parameters?.bodyFormat,
      subtype: parameters?.subtype,
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: PagesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a page in the space.
 *
 * Pages are created as published by default unless specified as a draft in the status field. If creating a published
 * page, the title must be specified.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the corresponding space.
 * Permission to create a page in the space.
 */
export async function createPage(client: Client, parameters: CreatePage): Promise<Page> {
  const config: SendRequestOptions<Page> = {
    url: '/wiki/api/v2/pages',
    method: 'POST',
    searchParams: {
      embedded: parameters.embedded,
      private: parameters.private,
      'root-level': parameters.rootLevel,
    },
    body: parameters.body,
    schema: PageSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
 * corresponding space.
 */
export async function getPageById(client: Client, parameters: GetPageById): Promise<Page> {
  const config: SendRequestOptions<Page> = {
    url: `/wiki/api/v2/pages/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
      'get-draft': parameters.getDraft,
      status: parameters.status,
      version: parameters.version,
      'include-labels': parameters.includeLabels,
      'include-properties': parameters.includeProperties,
      'include-operations': parameters.includeOperations,
      'include-likes': parameters.includeLikes,
      'include-versions': parameters.includeVersions,
      'include-version': parameters.includeVersion,
      'include-favorited-by-current-user-status': parameters.includeFavoritedByCurrentUserStatus,
      'include-webresources': parameters.includeWebresources,
      'include-collaborators': parameters.includeCollaborators,
      'include-direct-children': parameters.includeDirectChildren,
    },
    schema: PageSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a page by id.
 *
 * When the "current" version is updated, the provided body content is considered as the latest version. This latest
 * body content will be attempted to be merged into the draft version through a content reconciliation algorithm. If two
 * versions are significantly diverged, the latest provided content may entirely override what was previously in the
 * draft.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
 * corresponding space. Permission to update pages in the space.
 */
export async function updatePage(client: Client, parameters: UpdatePage): Promise<Page> {
  const config: SendRequestOptions<Page> = {
    url: `/wiki/api/v2/pages/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: PageSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a page by id.
 *
 * By default this will delete pages that are non-drafts. To delete a page that is a draft, the endpoint must be called
 * on a draft with the following param `draft=true`. Discarded drafts are not sent to the trash and are permanently
 * deleted.
 *
 * Deleting a page moves the page to the trash, where it can be restored later. To permanently delete a page (or "purge"
 * it), the endpoint must be called on a **trashed** page with the following param `purge=true`.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
 * corresponding space. Permission to delete pages in the space. Permission to administer the space (if attempting to
 * purge).
 */
export async function deletePage(client: Client, parameters: DeletePage): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/pages/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      purge: parameters.purge,
      draft: parameters.draft,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Updates the title of a specified page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
 * corresponding space. Permission to update pages in the space.
 */
export async function updatePageTitle(client: Client, parameters: UpdatePageTitle): Promise<Page> {
  const config: SendRequestOptions<Page> = {
    url: `/wiki/api/v2/pages/${parameters.id}/title`,
    method: 'PUT',
    body: parameters.body,
    schema: PageSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all pages in a space. The number of results is limited by the `limit` parameter and additional results (if
 * available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission) and 'View' permission for the space. Only pages that the user has permission to view will be
 * returned.
 */
export async function getPagesInSpace(client: Client, parameters: GetPagesInSpace): Promise<PagesInSpace> {
  const config: SendRequestOptions<PagesInSpace> = {
    url: `/wiki/api/v2/spaces/${parameters.id}/pages`,
    method: 'GET',
    searchParams: {
      depth: parameters.depth,
      sort: parameters.sort,
      status: parameters.status,
      title: parameters.title,
      'body-format': parameters.bodyFormat,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: PagesInSpaceSchema,
  };

  return await client.sendRequest(config);
}
