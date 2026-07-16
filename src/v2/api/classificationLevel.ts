import { ClassificationLevelSchema, type ClassificationLevel } from '../models/classificationLevel';
import type { GetSpaceDefaultClassificationLevel } from '../parameters/getSpaceDefaultClassificationLevel';
import type { PutSpaceDefaultClassificationLevel } from '../parameters/putSpaceDefaultClassificationLevel';
import type { DeleteSpaceDefaultClassificationLevel } from '../parameters/deleteSpaceDefaultClassificationLevel';
import type { GetPageClassificationLevel } from '../parameters/getPageClassificationLevel';
import type { PutPageClassificationLevel } from '../parameters/putPageClassificationLevel';
import type { PostPageClassificationLevel } from '../parameters/postPageClassificationLevel';
import type { GetBlogPostClassificationLevel } from '../parameters/getBlogPostClassificationLevel';
import type { PutBlogPostClassificationLevel } from '../parameters/putBlogPostClassificationLevel';
import type { PostBlogPostClassificationLevel } from '../parameters/postBlogPostClassificationLevel';
import type { GetWhiteboardClassificationLevel } from '../parameters/getWhiteboardClassificationLevel';
import type { PutWhiteboardClassificationLevel } from '../parameters/putWhiteboardClassificationLevel';
import type { PostWhiteboardClassificationLevel } from '../parameters/postWhiteboardClassificationLevel';
import type { GetDatabaseClassificationLevel } from '../parameters/getDatabaseClassificationLevel';
import type { PutDatabaseClassificationLevel } from '../parameters/putDatabaseClassificationLevel';
import type { PostDatabaseClassificationLevel } from '../parameters/postDatabaseClassificationLevel';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns a list of [classification
 * levels](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) available.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission).
 */
export async function getClassificationLevels(client: Client): Promise<ClassificationLevel[]> {
  const config: SendRequestOptions<ClassificationLevel[]> = {
    url: '/wiki/api/v2/classification-levels',
    method: 'GET',
    schema: z.array(ClassificationLevelSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns the [default classification
 * level](https://support.atlassian.com/security-and-access-policies/docs/what-is-a-default-classification-level/) for a
 * specific space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the space.
 */
export async function getSpaceDefaultClassificationLevel(
  client: Client,
  parameters: GetSpaceDefaultClassificationLevel,
): Promise<ClassificationLevel> {
  const config: SendRequestOptions<ClassificationLevel> = {
    url: `/wiki/api/v2/spaces/${parameters.id}/classification-level/default`,
    method: 'GET',
    schema: ClassificationLevelSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update the [default classification
 * level](https://support.atlassian.com/security-and-access-policies/docs/what-is-a-default-classification-level/) for a
 * specific space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and 'Admin' permission for the space.
 */
export async function putSpaceDefaultClassificationLevel(
  client: Client,
  parameters: PutSpaceDefaultClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/spaces/${parameters.id}/classification-level/default`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the [default classification
 * level](https://support.atlassian.com/security-and-access-policies/docs/what-is-a-default-classification-level/) for a
 * specific space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and 'Admin' permission for the space.
 */
export async function deleteSpaceDefaultClassificationLevel(
  client: Client,
  parameters: DeleteSpaceDefaultClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/spaces/${parameters.id}/classification-level/default`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the [classification
 * level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) for a specific page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the page. 'Permission to edit the page is required if trying to
 * view classification level for a draft.
 */
export async function getPageClassificationLevel(
  client: Client,
  parameters: GetPageClassificationLevel,
): Promise<ClassificationLevel> {
  const config: SendRequestOptions<ClassificationLevel> = {
    url: `/wiki/api/v2/pages/${parameters.id}/classification-level`,
    method: 'GET',
    searchParams: {
      status: parameters.status,
    },
    schema: ClassificationLevelSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the [classification
 * level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) for a specific page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to edit the page.
 */
export async function putPageClassificationLevel(
  client: Client,
  parameters: PutPageClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/pages/${parameters.id}/classification-level`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the [classification level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level)
 * for a specific page for the space [default classification
 * level](https://support.atlassian.com/security-and-access-policies/docs/what-is-a-default-classification-level/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the page.
 */
export async function postPageClassificationLevel(
  client: Client,
  parameters: PostPageClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/pages/${parameters.id}/classification-level/reset`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the [classification
 * level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) for a specific blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the blog post. 'Permission to edit the blog post is required if
 * trying to view classification level for a draft.
 */
export async function getBlogPostClassificationLevel(
  client: Client,
  parameters: GetBlogPostClassificationLevel,
): Promise<ClassificationLevel> {
  const config: SendRequestOptions<ClassificationLevel> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/classification-level`,
    method: 'GET',
    searchParams: {
      status: parameters.status,
    },
    schema: ClassificationLevelSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the [classification
 * level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) for a specific blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to edit the blog post.
 */
export async function putBlogPostClassificationLevel(
  client: Client,
  parameters: PutBlogPostClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/classification-level`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the [classification level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level)
 * for a specific blog post for the space\
 * [default classification
 * level](https://support.atlassian.com/security-and-access-policies/docs/what-is-a-default-classification-level/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the blog post.
 */
export async function postBlogPostClassificationLevel(
  client: Client,
  parameters: PostBlogPostClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/blogposts/${parameters.id}/classification-level/reset`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the [classification
 * level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) for a specific
 * whiteboard.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the whiteboard.
 */
export async function getWhiteboardClassificationLevel(
  client: Client,
  parameters: GetWhiteboardClassificationLevel,
): Promise<ClassificationLevel> {
  const config: SendRequestOptions<ClassificationLevel> = {
    url: `/wiki/api/v2/whiteboards/${parameters.id}/classification-level`,
    method: 'GET',
    schema: ClassificationLevelSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the [classification
 * level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) for a specific
 * whiteboard.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to edit the whiteboard.
 */
export async function putWhiteboardClassificationLevel(
  client: Client,
  parameters: PutWhiteboardClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/whiteboards/${parameters.id}/classification-level`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the [classification level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level)
 * for a specific whiteboard for the space [default classification
 * level](https://support.atlassian.com/security-and-access-policies/docs/what-is-a-default-classification-level/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the whiteboard.
 */
export async function postWhiteboardClassificationLevel(
  client: Client,
  parameters: PostWhiteboardClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/whiteboards/${parameters.id}/classification-level/reset`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the [classification
 * level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) for a specific database.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the database.
 */
export async function getDatabaseClassificationLevel(
  client: Client,
  parameters: GetDatabaseClassificationLevel,
): Promise<ClassificationLevel> {
  const config: SendRequestOptions<ClassificationLevel> = {
    url: `/wiki/api/v2/databases/${parameters.id}/classification-level`,
    method: 'GET',
    schema: ClassificationLevelSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the [classification
 * level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level) for a specific database.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to edit the database.
 */
export async function putDatabaseClassificationLevel(
  client: Client,
  parameters: PutDatabaseClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/databases/${parameters.id}/classification-level`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the [classification level](https://developer.atlassian.com/cloud/admin/dlp/rest/intro/#Classification%20level)
 * for a specific database for the space [default classification
 * level](https://support.atlassian.com/security-and-access-policies/docs/what-is-a-default-classification-level/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Permission to access the Confluence site
 * ('Can use' global permission) and permission to view the database.
 */
export async function postDatabaseClassificationLevel(
  client: Client,
  parameters: PostDatabaseClassificationLevel,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/api/v2/databases/${parameters.id}/classification-level/reset`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}
