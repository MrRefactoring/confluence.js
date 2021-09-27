import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentChildrenAndDescendants {
  constructor(private client: Client) {}

  /**
   * Returns a map of the direct children of a piece of content. A piece of content has different types of child
   * content, depending on its type. These are the default parent-child content type relationships:
   *
   * - `page`: child content is `page`, `comment`, `attachment`
   * - `blogpost`: child content is `comment`, `attachment`
   * - `attachment`: child content is `comment`
   * - `comment`: child content is `attachment`
   *
   * Apps can override these default relationships. Apps can also introduce new content types that create new
   * parent-child content relationships.
   *
   * Note, the map will always include all child content types that are valid for the content. However, if the content
   * has no instances of a child content type, the map will contain an empty array for that child content type.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentChildren<T = Models.ContentChildren>(
    parameters: Parameters.GetContentChildren,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a map of the direct children of a piece of content. A piece of content has different types of child
   * content, depending on its type. These are the default parent-child content type relationships:
   *
   * - `page`: child content is `page`, `comment`, `attachment`
   * - `blogpost`: child content is `comment`, `attachment`
   * - `attachment`: child content is `comment`
   * - `comment`: child content is `attachment`
   *
   * Apps can override these default relationships. Apps can also introduce new content types that create new
   * parent-child content relationships.
   *
   * Note, the map will always include all child content types that are valid for the content. However, if the content
   * has no instances of a child content type, the map will contain an empty array for that child content type.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentChildren<T = Models.ContentChildren>(
    parameters: Parameters.GetContentChildren,
    callback?: never
  ): Promise<T>;
  async getContentChildren<T = Models.ContentChildren>(
    parameters: Parameters.GetContentChildren,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        parentVersion: parameters.parentVersion,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getContentChildren' });
  }

  /**
   * Move a page to a new location relative to a target page:
   *
   * - `before` - move the page under the same parent as the target, before the target in the list of children
   * - `after` - move the page under the same parent as the target, after the target in the list of children
   * - `append` - move the page to be a child of the target
   *
   * Caution: This API can move pages to the top level of a space. Top-level pages are difficult to find in the UI
   * because they do not show up in the page tree display. To avoid this, never use `before` or `after` positions when
   * the `targetId` is a top-level page.
   */
  async movePage<T = Models.MovePage>(parameters: Parameters.MovePage, callback: Callback<T>): Promise<void>;
  /**
   * Move a page to a new location relative to a target page:
   *
   * - `before` - move the page under the same parent as the target, before the target in the list of children
   * - `after` - move the page under the same parent as the target, after the target in the list of children
   * - `append` - move the page to be a child of the target
   *
   * Caution: This API can move pages to the top level of a space. Top-level pages are difficult to find in the UI
   * because they do not show up in the page tree display. To avoid this, never use `before` or `after` positions when
   * the `targetId` is a top-level page.
   */
  async movePage<T = Models.MovePage>(parameters: Parameters.MovePage, callback?: never): Promise<T>;
  async movePage<T = Models.MovePage>(parameters: Parameters.MovePage, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/move/${parameters.position}/${parameters.targetId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'movePage' });
  }

  /**
   * Returns all children of a given type, for a piece of content. A piece of content has different types of child
   * content, depending on its type:
   *
   * - `page`: child content is `page`, `comment`, `attachment`
   * - `blogpost`: child content is `comment`, `attachment`
   * - `attachment`: child content is `comment`
   * - `comment`: child content is `attachment`
   *
   * Custom content types that are provided by apps can also be returned.
   *
   * Note, this method only returns direct children. To return children at all levels, use [Get descendants by
   * type](#api-content-id-descendant-type-get).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentChildrenByType<T = Models.ContentArray>(
    parameters: Parameters.GetContentChildrenByType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all children of a given type, for a piece of content. A piece of content has different types of child
   * content, depending on its type:
   *
   * - `page`: child content is `page`, `comment`, `attachment`
   * - `blogpost`: child content is `comment`, `attachment`
   * - `attachment`: child content is `comment`
   * - `comment`: child content is `attachment`
   *
   * Custom content types that are provided by apps can also be returned.
   *
   * Note, this method only returns direct children. To return children at all levels, use [Get descendants by
   * type](#api-content-id-descendant-type-get).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getContentChildrenByType<T = Models.ContentArray>(
    parameters: Parameters.GetContentChildrenByType,
    callback?: never
  ): Promise<T>;
  async getContentChildrenByType<T = Models.ContentArray>(
    parameters: Parameters.GetContentChildrenByType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child/${parameters.type}`,
      method: 'GET',
      params: {
        parentVersion: parameters.parentVersion,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getContentChildrenByType' });
  }

  /**
   * Returns a map of the descendants of a piece of content. This is similar to [Get content
   * children](#api-content-id-child-get), except that this method returns child pages at all levels, rather than just
   * the direct child pages.
   *
   * A piece of content has different types of descendants, depending on its type:
   *
   * - `page`: descendant is `page`, `comment`, `attachment`
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
  async getContentDescendants<T = Models.ContentChildren>(
    parameters: Parameters.GetContentDescendants,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a map of the descendants of a piece of content. This is similar to [Get content
   * children](#api-content-id-child-get), except that this method returns child pages at all levels, rather than just
   * the direct child pages.
   *
   * A piece of content has different types of descendants, depending on its type:
   *
   * - `page`: descendant is `page`, `comment`, `attachment`
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
  async getContentDescendants<T = Models.ContentChildren>(
    parameters: Parameters.GetContentDescendants,
    callback?: never
  ): Promise<T>;
  async getContentDescendants<T = Models.ContentChildren>(
    parameters: Parameters.GetContentDescendants,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/descendant`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getContentDescendants' });
  }

  /** @deprecated This API will be removed in the next major version. Use `getDescendantsOfType` method instead. */
  async descendantsOfType<T = Models.ContentArray>(
    parameters: Parameters.DescendantsOfType,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated This API will be removed in the next major version. Use `getDescendantsOfType` method instead. */
  async descendantsOfType<T = Models.ContentArray>(
    parameters: Parameters.DescendantsOfType,
    callback?: never
  ): Promise<T>;
  async descendantsOfType<T = Models.ContentArray>(
    parameters: Parameters.DescendantsOfType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    return this.getDescendantsOfType(parameters, callback!);
  }

  /**
   * Returns all descendants of a given type, for a piece of content. This is similar to [Get content children by
   * type](#api-content-id-child-type-get), except that this method returns child pages at all levels, rather than just
   * the direct child pages.
   *
   * A piece of content has different types of descendants, depending on its type:
   *
   * - `page`: descendant is `page`, `comment`, `attachment`
   * - `blogpost`: descendant is `comment`, `attachment`
   * - `attachment`: descendant is `comment`
   * - `comment`: descendant is `attachment`
   *
   * Custom content types that are provided by apps can also be returned.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getDescendantsOfType<T = Models.ContentArray>(
    parameters: Parameters.GetDescendantsOfType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all descendants of a given type, for a piece of content. This is similar to [Get content children by
   * type](#api-content-id-child-type-get), except that this method returns child pages at all levels, rather than just
   * the direct child pages.
   *
   * A piece of content has different types of descendants, depending on its type:
   *
   * - `page`: descendant is `page`, `comment`, `attachment`
   * - `blogpost`: descendant is `comment`, `attachment`
   * - `attachment`: descendant is `comment`
   * - `comment`: descendant is `attachment`
   *
   * Custom content types that are provided by apps can also be returned.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space, and
   * permission to view the content if it is a page.
   */
  async getDescendantsOfType<T = Models.ContentArray>(
    parameters: Parameters.GetDescendantsOfType,
    callback?: never
  ): Promise<T>;
  async getDescendantsOfType<T = Models.ContentArray>(
    parameters: Parameters.GetDescendantsOfType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/descendant/${parameters.type}`,
      method: 'GET',
      params: {
        depth: parameters.depth,
        start: parameters.start,
        limit: parameters.limit,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'descendantsOfType' });
  }

  /**
   * Copy page hierarchy allows the copying of an entire hierarchy of pages and their associated properties, permissions
   * and attachments. The id path parameter refers to the content id of the page to copy, and the new parent of this
   * copied page is defined using the destinationPageId in the request body. The titleOptions object defines the rules
   * of renaming page titles during the copy; for example, search and replace can be used in conjunction to rewrite the
   * copied page titles.
   */
  async copyPageHierarchy<T = unknown>(parameters: Parameters.CopyPageHierarchy, callback: Callback<T>): Promise<void>;
  /**
   * Copy page hierarchy allows the copying of an entire hierarchy of pages and their associated properties, permissions
   * and attachments. The id path parameter refers to the content id of the page to copy, and the new parent of this
   * copied page is defined using the destinationPageId in the request body. The titleOptions object defines the rules
   * of renaming page titles during the copy; for example, search and replace can be used in conjunction to rewrite the
   * copied page titles.
   */
  async copyPageHierarchy<T = unknown>(parameters: Parameters.CopyPageHierarchy, callback?: never): Promise<T>;
  async copyPageHierarchy<T = unknown>(
    parameters: Parameters.CopyPageHierarchy,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/pagehierarchy/copy`,
      method: 'POST',
      data: {
        copyAttachments: parameters.copyAttachments,
        copyPermissions: parameters.copyPermissions,
        copyProperties: parameters.copyProperties,
        copyLabels: parameters.copyLabels,
        copyCustomContents: parameters.copyCustomContents,
        destinationPageId: parameters.destinationPageId,
        titleOptions: parameters.titleOptions,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'copyPageHierarchy' });
  }

  /**
   * Copies a single page and its associated properties, permissions, attachments, and custom contents. The `id` path
   * parameter refers to the content ID of the page to copy. The target of the page to be copied is defined using the
   * `destination` in the request body and can be one of the following types.
   *
   * - `space`: page will be copied to the specified space as a root page on the space
   * - `parent_page`: page will be copied as a child of the specified parent page
   * - `existing_page`: page will be copied and replace the specified page
   *
   * By default, the following objects are expanded: `space`, `history`, `version`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Add' permission for the space that the
   * content will be copied in and permission to update the content if copying to an `existing_page`.
   */
  async copyPage<T = unknown>(parameters: Parameters.CopyPage, callback: Callback<T>): Promise<void>;
  /**
   * Copies a single page and its associated properties, permissions, attachments, and custom contents. The `id` path
   * parameter refers to the content ID of the page to copy. The target of the page to be copied is defined using the
   * `destination` in the request body and can be one of the following types.
   *
   * - `space`: page will be copied to the specified space as a root page on the space
   * - `parent_page`: page will be copied as a child of the specified parent page
   * - `existing_page`: page will be copied and replace the specified page
   *
   * By default, the following objects are expanded: `space`, `history`, `version`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Add' permission for the space that the
   * content will be copied in and permission to update the content if copying to an `existing_page`.
   */
  async copyPage<T = unknown>(parameters: Parameters.CopyPage, callback?: never): Promise<T>;
  async copyPage<T = unknown>(parameters: Parameters.CopyPage, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/copy`,
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: parameters.bodyParameters,
    };

    return this.client.sendRequest(config, callback, { methodName: 'copyPage' });
  }
}
