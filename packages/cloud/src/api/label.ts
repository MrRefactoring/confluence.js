import { AttachmentLabelsSchema, type AttachmentLabels } from '#/models/attachmentLabels';
import { BlogPostLabelsSchema, type BlogPostLabels } from '#/models/blogPostLabels';
import { CustomContentLabelsSchema, type CustomContentLabels } from '#/models/customContentLabels';
import { LabelsSchema, type Labels } from '#/models/labels';
import { PageLabelsSchema, type PageLabels } from '#/models/pageLabels';
import { SpaceLabelsSchema, type SpaceLabels } from '#/models/spaceLabels';
import { SpaceContentLabelsSchema, type SpaceContentLabels } from '#/models/spaceContentLabels';
import type { GetAttachmentLabels } from '#/parameters/getAttachmentLabels';
import type { GetBlogPostLabels } from '#/parameters/getBlogPostLabels';
import type { GetCustomContentLabels } from '#/parameters/getCustomContentLabels';
import type { GetLabels } from '#/parameters/getLabels';
import type { GetPageLabels } from '#/parameters/getPageLabels';
import type { GetSpaceLabels } from '#/parameters/getSpaceLabels';
import type { GetSpaceContentLabels } from '#/parameters/getSpaceContentLabels';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Returns the labels of specific attachment. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
 * attachment and its corresponding space. Only labels that the user has permission to view will be returned.
 */
export async function getAttachmentLabels(client: Client, parameters: GetAttachmentLabels): Promise<AttachmentLabels> {
  const config: SendRequestOptions<AttachmentLabels> = {
    url: `/attachments/${parameters.id}/labels`,
    method: 'GET',
    searchParams: {
      prefix: parameters.prefix,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: AttachmentLabelsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the labels of specific blog post. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
 * post and its corresponding space. Only labels that the user has permission to view will be returned.
 */
export async function getBlogPostLabels(client: Client, parameters: GetBlogPostLabels): Promise<BlogPostLabels> {
  const config: SendRequestOptions<BlogPostLabels> = {
    url: `/blogposts/${parameters.id}/labels`,
    method: 'GET',
    searchParams: {
      prefix: parameters.prefix,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: BlogPostLabelsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the labels for a specific piece of custom content. The number of results is limited by the `limit` parameter
 * and additional results (if available) will be available through the `next` URL present in the `Link` response
 * header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and its
 * corresponding space. Only labels that the user has permission to view will be returned.
 */
export async function getCustomContentLabels(
  client: Client,
  parameters: GetCustomContentLabels,
): Promise<CustomContentLabels> {
  const config: SendRequestOptions<CustomContentLabels> = {
    url: `/custom-content/${parameters.id}/labels`,
    method: 'GET',
    searchParams: {
      prefix: parameters.prefix,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: CustomContentLabelsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all labels. The number of results is limited by the `limit` parameter and additional results (if available)
 * will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only labels that the user has permission to view will be returned.
 */
export async function getLabels(client: Client, parameters?: GetLabels): Promise<Labels> {
  const config: SendRequestOptions<Labels> = {
    url: '/labels',
    method: 'GET',
    searchParams: {
      'label-id': parameters?.labelId,
      prefix: parameters?.prefix,
      cursor: parameters?.cursor,
      sort: parameters?.sort,
      limit: parameters?.limit,
    },
    schema: LabelsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the labels of specific page. The number of results is limited by the `limit` parameter and additional results
 * (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page and
 * its corresponding space. Only labels that the user has permission to view will be returned.
 */
export async function getPageLabels(client: Client, parameters: GetPageLabels): Promise<PageLabels> {
  const config: SendRequestOptions<PageLabels> = {
    url: `/pages/${parameters.id}/labels`,
    method: 'GET',
    searchParams: {
      prefix: parameters.prefix,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: PageLabelsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the labels of specific space. The number of results is limited by the `limit` parameter and additional
 * results (if available) will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the space. Only labels that
 * the user has permission to view will be returned.
 */
export async function getSpaceLabels(client: Client, parameters: GetSpaceLabels): Promise<SpaceLabels> {
  const config: SendRequestOptions<SpaceLabels> = {
    url: `/spaces/${parameters.id}/labels`,
    method: 'GET',
    searchParams: {
      prefix: parameters.prefix,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: SpaceLabelsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the labels of space content (pages, blogposts etc). The number of results is limited by the `limit` parameter
 * and additional results (if available) will be available through the `next` URL present in the `Link` response
 * header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the space. Only labels that
 * the user has permission to view will be returned.
 */
export async function getSpaceContentLabels(
  client: Client,
  parameters: GetSpaceContentLabels,
): Promise<SpaceContentLabels> {
  const config: SendRequestOptions<SpaceContentLabels> = {
    url: `/spaces/${parameters.id}/content/labels`,
    method: 'GET',
    searchParams: {
      prefix: parameters.prefix,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: SpaceContentLabelsSchema,
  };

  return await client.sendRequest(config);
}
