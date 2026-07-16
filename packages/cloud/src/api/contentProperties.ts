import {
  WhiteboardContentPropertiesSchema,
  type WhiteboardContentProperties,
} from '#/models/whiteboardContentProperties';
import { ContentPropertySchema, type ContentProperty } from '#/models/contentProperty';
import { DatabaseContentPropertiesSchema, type DatabaseContentProperties } from '#/models/databaseContentProperties';
import { SmartLinkContentPropertiesSchema, type SmartLinkContentProperties } from '#/models/smartLinkContentProperties';
import { FolderContentPropertiesSchema, type FolderContentProperties } from '#/models/folderContentProperties';
import {
  AttachmentContentPropertiesSchema,
  type AttachmentContentProperties,
} from '#/models/attachmentContentProperties';
import { BlogpostContentPropertiesSchema, type BlogpostContentProperties } from '#/models/blogpostContentProperties';
import {
  CustomContentContentPropertiesSchema,
  type CustomContentContentProperties,
} from '#/models/customContentContentProperties';
import { PageContentPropertiesSchema, type PageContentProperties } from '#/models/pageContentProperties';
import { CommentContentPropertiesSchema, type CommentContentProperties } from '#/models/commentContentProperties';
import type { GetWhiteboardContentProperties } from '#/parameters/getWhiteboardContentProperties';
import type { CreateWhiteboardProperty } from '#/parameters/createWhiteboardProperty';
import type { GetDatabaseContentProperties } from '#/parameters/getDatabaseContentProperties';
import type { CreateDatabaseProperty } from '#/parameters/createDatabaseProperty';
import type { GetSmartLinkContentProperties } from '#/parameters/getSmartLinkContentProperties';
import type { CreateSmartLinkProperty } from '#/parameters/createSmartLinkProperty';
import type { GetFolderContentProperties } from '#/parameters/getFolderContentProperties';
import type { CreateFolderProperty } from '#/parameters/createFolderProperty';
import type { GetAttachmentContentProperties } from '#/parameters/getAttachmentContentProperties';
import type { CreateAttachmentProperty } from '#/parameters/createAttachmentProperty';
import type { GetAttachmentContentPropertiesById } from '#/parameters/getAttachmentContentPropertiesById';
import type { UpdateAttachmentPropertyById } from '#/parameters/updateAttachmentPropertyById';
import type { DeleteAttachmentPropertyById } from '#/parameters/deleteAttachmentPropertyById';
import type { GetBlogpostContentProperties } from '#/parameters/getBlogpostContentProperties';
import type { CreateBlogpostProperty } from '#/parameters/createBlogpostProperty';
import type { GetBlogpostContentPropertiesById } from '#/parameters/getBlogpostContentPropertiesById';
import type { UpdateBlogpostPropertyById } from '#/parameters/updateBlogpostPropertyById';
import type { DeleteBlogpostPropertyById } from '#/parameters/deleteBlogpostPropertyById';
import type { GetCustomContentContentProperties } from '#/parameters/getCustomContentContentProperties';
import type { CreateCustomContentProperty } from '#/parameters/createCustomContentProperty';
import type { GetCustomContentContentPropertiesById } from '#/parameters/getCustomContentContentPropertiesById';
import type { UpdateCustomContentPropertyById } from '#/parameters/updateCustomContentPropertyById';
import type { DeleteCustomContentPropertyById } from '#/parameters/deleteCustomContentPropertyById';
import type { GetPageContentProperties } from '#/parameters/getPageContentProperties';
import type { CreatePageProperty } from '#/parameters/createPageProperty';
import type { GetPageContentPropertiesById } from '#/parameters/getPageContentPropertiesById';
import type { UpdatePagePropertyById } from '#/parameters/updatePagePropertyById';
import type { DeletePagePropertyById } from '#/parameters/deletePagePropertyById';
import type { GetWhiteboardContentPropertiesById } from '#/parameters/getWhiteboardContentPropertiesById';
import type { UpdateWhiteboardPropertyById } from '#/parameters/updateWhiteboardPropertyById';
import type { DeleteWhiteboardPropertyById } from '#/parameters/deleteWhiteboardPropertyById';
import type { GetDatabaseContentPropertiesById } from '#/parameters/getDatabaseContentPropertiesById';
import type { UpdateDatabasePropertyById } from '#/parameters/updateDatabasePropertyById';
import type { DeleteDatabasePropertyById } from '#/parameters/deleteDatabasePropertyById';
import type { GetSmartLinkContentPropertiesById } from '#/parameters/getSmartLinkContentPropertiesById';
import type { UpdateSmartLinkPropertyById } from '#/parameters/updateSmartLinkPropertyById';
import type { DeleteSmartLinkPropertyById } from '#/parameters/deleteSmartLinkPropertyById';
import type { GetFolderContentPropertiesById } from '#/parameters/getFolderContentPropertiesById';
import type { UpdateFolderPropertyById } from '#/parameters/updateFolderPropertyById';
import type { DeleteFolderPropertyById } from '#/parameters/deleteFolderPropertyById';
import type { GetCommentContentProperties } from '#/parameters/getCommentContentProperties';
import type { CreateCommentProperty } from '#/parameters/createCommentProperty';
import type { GetCommentContentPropertiesById } from '#/parameters/getCommentContentPropertiesById';
import type { UpdateCommentPropertyById } from '#/parameters/updateCommentPropertyById';
import type { DeleteCommentPropertyById } from '#/parameters/deleteCommentPropertyById';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Retrieves Content Properties tied to a specified whiteboard.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the whiteboard.
 */
export async function getWhiteboardContentProperties(
  client: Client,
  parameters: GetWhiteboardContentProperties,
): Promise<WhiteboardContentProperties> {
  const config: SendRequestOptions<WhiteboardContentProperties> = {
    url: `/whiteboards/${parameters.id}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: WhiteboardContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new content property for a whiteboard.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the whiteboard.
 */
export async function createWhiteboardProperty(
  client: Client,
  parameters: CreateWhiteboardProperty,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/whiteboards/${parameters.id}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves Content Properties tied to a specified database.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the database.
 */
export async function getDatabaseContentProperties(
  client: Client,
  parameters: GetDatabaseContentProperties,
): Promise<DatabaseContentProperties> {
  const config: SendRequestOptions<DatabaseContentProperties> = {
    url: `/databases/${parameters.id}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: DatabaseContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new content property for a database.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the database.
 */
export async function createDatabaseProperty(
  client: Client,
  parameters: CreateDatabaseProperty,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/databases/${parameters.id}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves Content Properties tied to a specified Smart Link in the content tree.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the Smart Link in the
 * content tree.
 */
export async function getSmartLinkContentProperties(
  client: Client,
  parameters: GetSmartLinkContentProperties,
): Promise<SmartLinkContentProperties> {
  const config: SendRequestOptions<SmartLinkContentProperties> = {
    url: `/embeds/${parameters.id}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: SmartLinkContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new content property for a Smart Link in the content tree.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the Smart Link in the
 * content tree.
 */
export async function createSmartLinkProperty(
  client: Client,
  parameters: CreateSmartLinkProperty,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/embeds/${parameters.id}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves Content Properties tied to a specified folder.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the folder.
 */
export async function getFolderContentProperties(
  client: Client,
  parameters: GetFolderContentProperties,
): Promise<FolderContentProperties> {
  const config: SendRequestOptions<FolderContentProperties> = {
    url: `/folders/${parameters.id}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: FolderContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new content property for a folder.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the folder.
 */
export async function createFolderProperty(client: Client, parameters: CreateFolderProperty): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/folders/${parameters.id}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves all Content Properties tied to a specified attachment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
 */
export async function getAttachmentContentProperties(
  client: Client,
  parameters: GetAttachmentContentProperties,
): Promise<AttachmentContentProperties> {
  const config: SendRequestOptions<AttachmentContentProperties> = {
    url: `/attachments/${parameters.attachmentId}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: AttachmentContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new content property for an attachment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the attachment.
 */
export async function createAttachmentProperty(
  client: Client,
  parameters: CreateAttachmentProperty,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/attachments/${parameters.attachmentId}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified attachment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
 */
export async function getAttachmentContentPropertiesById(
  client: Client,
  parameters: GetAttachmentContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/attachments/${parameters.attachmentId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for attachment by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the attachment.
 */
export async function updateAttachmentPropertyById(
  client: Client,
  parameters: UpdateAttachmentPropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/attachments/${parameters.attachmentId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for an attachment by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to attachment the page.
 */
export async function deleteAttachmentPropertyById(
  client: Client,
  parameters: DeleteAttachmentPropertyById,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/attachments/${parameters.attachmentId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves all Content Properties tied to a specified blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
 */
export async function getBlogpostContentProperties(
  client: Client,
  parameters: GetBlogpostContentProperties,
): Promise<BlogpostContentProperties> {
  const config: SendRequestOptions<BlogpostContentProperties> = {
    url: `/blogposts/${parameters.blogpostId}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: BlogpostContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new property for a blogpost.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the blog post.
 */
export async function createBlogpostProperty(
  client: Client,
  parameters: CreateBlogpostProperty,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/blogposts/${parameters.blogpostId}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified blog post.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
 */
export async function getBlogpostContentPropertiesById(
  client: Client,
  parameters: GetBlogpostContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/blogposts/${parameters.blogpostId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for blog post by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the blog post.
 */
export async function updateBlogpostPropertyById(
  client: Client,
  parameters: UpdateBlogpostPropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/blogposts/${parameters.blogpostId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for a blogpost by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the blog post.
 */
export async function deleteBlogpostPropertyById(
  client: Client,
  parameters: DeleteBlogpostPropertyById,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/blogposts/${parameters.blogpostId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves Content Properties tied to a specified custom content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content.
 */
export async function getCustomContentContentProperties(
  client: Client,
  parameters: GetCustomContentContentProperties,
): Promise<CustomContentContentProperties> {
  const config: SendRequestOptions<CustomContentContentProperties> = {
    url: `/custom-content/${parameters.customContentId}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: CustomContentContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new content property for a piece of custom content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the custom content.
 */
export async function createCustomContentProperty(
  client: Client,
  parameters: CreateCustomContentProperty,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/custom-content/${parameters.customContentId}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified custom content.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
 */
export async function getCustomContentContentPropertiesById(
  client: Client,
  parameters: GetCustomContentContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/custom-content/${parameters.customContentId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for a piece of custom content by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the custom content.
 */
export async function updateCustomContentPropertyById(
  client: Client,
  parameters: UpdateCustomContentPropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/custom-content/${parameters.customContentId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for a piece of custom content by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the custom content.
 */
export async function deleteCustomContentPropertyById(
  client: Client,
  parameters: DeleteCustomContentPropertyById,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/custom-content/${parameters.customContentId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves Content Properties tied to a specified page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
 */
export async function getPageContentProperties(
  client: Client,
  parameters: GetPageContentProperties,
): Promise<PageContentProperties> {
  const config: SendRequestOptions<PageContentProperties> = {
    url: `/pages/${parameters.pageId}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: PageContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new content property for a page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the page.
 */
export async function createPageProperty(client: Client, parameters: CreatePageProperty): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/pages/${parameters.pageId}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified page.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
 */
export async function getPageContentPropertiesById(
  client: Client,
  parameters: GetPageContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/pages/${parameters.pageId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for a page by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the page.
 */
export async function updatePagePropertyById(
  client: Client,
  parameters: UpdatePagePropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/pages/${parameters.pageId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for a page by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the page.
 */
export async function deletePagePropertyById(client: Client, parameters: DeletePagePropertyById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/pages/${parameters.pageId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified whiteboard.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the whiteboard.
 */
export async function getWhiteboardContentPropertiesById(
  client: Client,
  parameters: GetWhiteboardContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/whiteboards/${parameters.whiteboardId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for a whiteboard by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the whiteboard.
 */
export async function updateWhiteboardPropertyById(
  client: Client,
  parameters: UpdateWhiteboardPropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/whiteboards/${parameters.whiteboardId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for a whiteboard by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the whiteboard.
 */
export async function deleteWhiteboardPropertyById(
  client: Client,
  parameters: DeleteWhiteboardPropertyById,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/whiteboards/${parameters.whiteboardId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified database.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the database.
 */
export async function getDatabaseContentPropertiesById(
  client: Client,
  parameters: GetDatabaseContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/databases/${parameters.databaseId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for a database by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the database.
 */
export async function updateDatabasePropertyById(
  client: Client,
  parameters: UpdateDatabasePropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/databases/${parameters.databaseId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for a database by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the database.
 */
export async function deleteDatabasePropertyById(
  client: Client,
  parameters: DeleteDatabasePropertyById,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/databases/${parameters.databaseId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified Smart Link in the content tree.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the Smart Link in the
 * content tree.
 */
export async function getSmartLinkContentPropertiesById(
  client: Client,
  parameters: GetSmartLinkContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/embeds/${parameters.embedId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for a Smart Link in the content tree by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the Smart Link in the
 * content tree.
 */
export async function updateSmartLinkPropertyById(
  client: Client,
  parameters: UpdateSmartLinkPropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/embeds/${parameters.embedId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for a Smart Link in the content tree by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the Smart Link in the
 * content tree.
 */
export async function deleteSmartLinkPropertyById(
  client: Client,
  parameters: DeleteSmartLinkPropertyById,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/embeds/${parameters.embedId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified folder.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the folder.
 */
export async function getFolderContentPropertiesById(
  client: Client,
  parameters: GetFolderContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/folders/${parameters.folderId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for a folder by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the folder.
 */
export async function updateFolderPropertyById(
  client: Client,
  parameters: UpdateFolderPropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/folders/${parameters.folderId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for a folder by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the folder.
 */
export async function deleteFolderPropertyById(client: Client, parameters: DeleteFolderPropertyById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/folders/${parameters.folderId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves Content Properties attached to a specified comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
 */
export async function getCommentContentProperties(
  client: Client,
  parameters: GetCommentContentProperties,
): Promise<CommentContentProperties> {
  const config: SendRequestOptions<CommentContentProperties> = {
    url: `/comments/${parameters.commentId}/properties`,
    method: 'GET',
    searchParams: {
      key: parameters.key,
      sort: parameters.sort,
      cursor: parameters.cursor,
      limit: parameters.limit,
    },
    schema: CommentContentPropertiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new content property for a comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the comment.
 */
export async function createCommentProperty(
  client: Client,
  parameters: CreateCommentProperty,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/comments/${parameters.commentId}/properties`,
    method: 'POST',
    body: {
      key: parameters.key,
      value: parameters.value,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves a specific Content Property by ID that is attached to a specified comment.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the comment.
 */
export async function getCommentContentPropertiesById(
  client: Client,
  parameters: GetCommentContentPropertiesById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/comments/${parameters.commentId}/properties/${parameters.propertyId}`,
    method: 'GET',
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a content property for a comment by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the comment.
 */
export async function updateCommentPropertyById(
  client: Client,
  parameters: UpdateCommentPropertyById,
): Promise<ContentProperty> {
  const config: SendRequestOptions<ContentProperty> = {
    url: `/comments/${parameters.commentId}/properties/${parameters.propertyId}`,
    method: 'PUT',
    body: {
      key: parameters.key,
      value: parameters.value,
      version: parameters.version,
    },
    schema: ContentPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a content property for a comment by its id.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the comment.
 */
export async function deleteCommentPropertyById(client: Client, parameters: DeleteCommentPropertyById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/comments/${parameters.commentId}/properties/${parameters.propertyId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
