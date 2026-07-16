import { PermittedOperationsSchema, type PermittedOperations } from '#/models/permittedOperations';
import type { GetAttachmentOperations } from '#/parameters/getAttachmentOperations';
import type { GetBlogPostOperations } from '#/parameters/getBlogPostOperations';
import type { GetCustomContentOperations } from '#/parameters/getCustomContentOperations';
import type { GetPageOperations } from '#/parameters/getPageOperations';
import type { GetWhiteboardOperations } from '#/parameters/getWhiteboardOperations';
import type { GetDatabaseOperations } from '#/parameters/getDatabaseOperations';
import type { GetSmartLinkOperations } from '#/parameters/getSmartLinkOperations';
import type { GetFolderOperations } from '#/parameters/getFolderOperations';
import type { GetSpaceOperations } from '#/parameters/getSpaceOperations';
import type { GetFooterCommentOperations } from '#/parameters/getFooterCommentOperations';
import type { GetInlineCommentOperations } from '#/parameters/getInlineCommentOperations';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Returns the permitted operations on specific attachment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
 * attachment and its corresponding space.
 */
export async function getAttachmentOperations(
  client: Client,
  parameters: GetAttachmentOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/attachments/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
 * blog post and its corresponding space.
 */
export async function getBlogPostOperations(
  client: Client,
  parameters: GetBlogPostOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/blogposts/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific custom content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
 * custom content and its corresponding space.
 */
export async function getCustomContentOperations(
  client: Client,
  parameters: GetCustomContentOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/custom-content/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
 * page and its corresponding space.
 */
export async function getPageOperations(client: Client, parameters: GetPageOperations): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/pages/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific whiteboard.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the whiteboard and its
 * corresponding space.
 */
export async function getWhiteboardOperations(
  client: Client,
  parameters: GetWhiteboardOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/whiteboards/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific database.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the database and its
 * corresponding space.
 */
export async function getDatabaseOperations(
  client: Client,
  parameters: GetDatabaseOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/databases/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific Smart Link in the content tree.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the Smart Link in the
 * content tree and its corresponding space.
 */
export async function getSmartLinkOperations(
  client: Client,
  parameters: GetSmartLinkOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/embeds/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific folder.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the folder and its
 * corresponding space.
 */
export async function getFolderOperations(
  client: Client,
  parameters: GetFolderOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/folders/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the corresponding space.
 */
export async function getSpaceOperations(client: Client, parameters: GetSpaceOperations): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/spaces/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific footer comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
 * footer comment and its corresponding space.
 */
export async function getFooterCommentOperations(
  client: Client,
  parameters: GetFooterCommentOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/footer-comments/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the permitted operations on specific inline comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the parent content of the
 * inline comment and its corresponding space.
 */
export async function getInlineCommentOperations(
  client: Client,
  parameters: GetInlineCommentOperations,
): Promise<PermittedOperations> {
  const config: SendRequestOptions<PermittedOperations> = {
    url: `/inline-comments/${parameters.id}/operations`,
    method: 'GET',
    schema: PermittedOperationsSchema,
  };

  return await client.sendRequest(config);
}
