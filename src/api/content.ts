import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Content {
  constructor(private client: Client) {}

  /**
   * Returns all content in a Confluence instance.
   *
   * By default, the following objects are expanded: `space`, `history`, `version`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only content that the user has permission to view will be returned.
   */
  async getContent<T = Models.ContentArray>(
    parameters: Parameters.GetContent | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all content in a Confluence instance.
   *
   * By default, the following objects are expanded: `space`, `history`, `version`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only content that the user has permission to view will be returned.
   */
  async getContent<T = Models.ContentArray>(parameters?: Parameters.GetContent, callback?: never): Promise<T>;
  async getContent<T = Models.ContentArray>(
    parameters?: Parameters.GetContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/content',
      method: 'GET',
      params: {
        type: parameters?.type,
        spaceKey: parameters?.spaceKey,
        title: parameters?.title,
        status: parameters?.status,
        postingDay: parameters?.postingDay,
        trigger: parameters?.trigger,
        orderby: parameters?.orderby,
        start: parameters?.start,
        limit: parameters?.limit,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new piece of content or publishes an existing draft.
   *
   * To publish a draft, add the `id` and `status` properties to the body of the request. Set the `id` to the ID of the
   * draft and set the `status` to 'current'. When the request is sent, a new piece of content will be created and the
   * metadata from the draft will be transferred into it.
   *
   * By default, the following objects are expanded: `space`, `history`, `version`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Add' permission for the space that the
   * content will be created in, and permission to view the draft if publishing a draft.
   */
  async createContent<T = Models.Content>(
    parameters: Parameters.CreateContent | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a new piece of content or publishes an existing draft.
   *
   * To publish a draft, add the `id` and `status` properties to the body of the request. Set the `id` to the ID of the
   * draft and set the `status` to 'current'. When the request is sent, a new piece of content will be created and the
   * metadata from the draft will be transferred into it.
   *
   * By default, the following objects are expanded: `space`, `history`, `version`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Add' permission for the space that the
   * content will be created in, and permission to view the draft if publishing a draft.
   */
  async createContent<T = Models.Content>(parameters?: Parameters.CreateContent, callback?: never): Promise<T>;
  async createContent<T = Models.Content>(
    parameters?: Parameters.CreateContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/content',
      method: 'POST',
      params: {
        status: parameters?.status,
        expand: parameters?.expand,
      },
      data: {
        ...parameters,
        status: undefined,
        expand: undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Archives a list of pages. The pages to be archived are specified as a list of content IDs. This API accepts the
   * archival request and returns a task ID. The archival process happens asynchronously. Use the /longtask/<taskId>
   * REST API to get the copy task status.
   *
   * Each content ID needs to resolve to page objects that are not already in an archived state. The content IDs need
   * not belong to the same space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Archive' permission for each of the pages
   * in the corresponding space it belongs to.
   */
  async archivePages<T = unknown>(
    parameters: Parameters.ArchivePages,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Archives a list of pages. The pages to be archived are specified as a list of content IDs. This API accepts the
   * archival request and returns a task ID. The archival process happens asynchronously. Use the /longtask/<taskId>
   * REST API to get the copy task status.
   *
   * Each content ID needs to resolve to page objects that are not already in an archived state. The content IDs need
   * not belong to the same space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Archive' permission for each of the pages
   * in the corresponding space it belongs to.
   */
  async archivePages<T = unknown>(parameters: Parameters.ArchivePages, callback?: never): Promise<T>;
  async archivePages<T = unknown>(parameters: Parameters.ArchivePages, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/content/archive',
      method: 'POST',
      data: {
        pages: parameters.pages,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Publishes a legacy draft of a page created from a blueprint. Legacy drafts will eventually be removed in favor of
   * shared drafts. For now, this method works the same as [Publish shared draft](#api-content-blueprint-instance-draftId-put).
   *
   * By default, the following objects are expanded: `body.storage`, `history`, `space`, `version`, `ancestors`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the draft and 'Add'
   * permission for the space that the content will be created in.
   */
  async publishLegacyDraft<T = Models.Content>(
    parameters: Parameters.PublishLegacyDraft,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Publishes a legacy draft of a page created from a blueprint. Legacy drafts will eventually be removed in favor of
   * shared drafts. For now, this method works the same as [Publish shared draft](#api-content-blueprint-instance-draftId-put).
   *
   * By default, the following objects are expanded: `body.storage`, `history`, `space`, `version`, `ancestors`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the draft and 'Add'
   * permission for the space that the content will be created in.
   */
  async publishLegacyDraft<T = Models.Content>(parameters: Parameters.PublishLegacyDraft, callback?: never): Promise<T>;
  async publishLegacyDraft<T = Models.Content>(
    parameters: Parameters.PublishLegacyDraft,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/blueprint/instance/${parameters.draftId}`,
      method: 'POST',
      params: {
        status: parameters.status,
      },
      data: {
        ...parameters,
        version: parameters.version,
        title: parameters.title,
        type: parameters.type,
        status: parameters.bodyStatus,
        space: parameters.space,
        ancestors: parameters.ancestors,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Publishes a shared draft of a page created from a blueprint.
   *
   * By default, the following objects are expanded: `body.storage`, `history`, `space`, `version`, `ancestors`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the draft and 'Add'
   * permission for the space that the content will be created in.
   */
  async publishSharedDraft<T = Models.Content>(
    parameters: Parameters.PublishSharedDraft,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Publishes a shared draft of a page created from a blueprint.
   *
   * By default, the following objects are expanded: `body.storage`, `history`, `space`, `version`, `ancestors`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the draft and 'Add'
   * permission for the space that the content will be created in.
   */
  async publishSharedDraft<T = Models.Content>(parameters: Parameters.PublishSharedDraft, callback?: never): Promise<T>;
  async publishSharedDraft<T = Models.Content>(
    parameters: Parameters.PublishSharedDraft,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/blueprint/instance/${parameters.draftId}`,
      method: 'PUT',
      params: {
        status: parameters.status,
      },
      data: {
        ...parameters,
        version: parameters.version,
        title: parameters.title,
        type: parameters.type,
        status: parameters.bodyStatus,
        space: parameters.space,
        ancestors: parameters.ancestors,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the list of content that matches a Confluence Query Language (CQL) query. For information on CQL, see:
   * [Advanced searching using CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
   *
   * When additional results are available, returns `next` and `prev` URLs to retrieve them in subsequent calls. The
   * URLs each contain a cursor that points to the appropriate set of results. Use `limit` to specify the number of
   * results returned in each call. Example subsequent call (taken from example response):
   * ```
   * https://your-domain.atlassian.net/wiki/rest/api/content/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg
   * ```
   * The response to this will have a `prev` URL similar to the `next` in the example response.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only content that the user has permission to view will be returned.
   */
  async searchContentByCQL<T = Models.ContentArray>(
    parameters: Parameters.SearchContentByCQL,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the list of content that matches a Confluence Query Language (CQL) query. For information on CQL, see:
   * [Advanced searching using CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
   *
   * When additional results are available, returns `next` and `prev` URLs to retrieve them in subsequent calls. The
   * URLs each contain a cursor that points to the appropriate set of results. Use `limit` to specify the number of
   * results returned in each call. Example subsequent call (taken from example response):
   * ```
   * https://your-domain.atlassian.net/wiki/rest/api/content/search?cql=type=page&limit=25&cursor=raNDoMsTRiNg
   * ```
   * The response to this will have a `prev` URL similar to the `next` in the example response.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only content that the user has permission to view will be returned.
   */
  async searchContentByCQL<T = Models.ContentArray>(
    parameters: Parameters.SearchContentByCQL,
    callback?: never
  ): Promise<T>;
  async searchContentByCQL<T = Models.ContentArray>(
    parameters: Parameters.SearchContentByCQL,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/content/search',
      method: 'GET',
      params: {
        cql: parameters.cql,
        cqlcontext: parameters.cqlcontext,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a single piece of content, like a page or a blog post.
   *
   * By default, the following objects are expanded: `space`, `history`, `version`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content. If the
   * content is a blog post, 'View' permission for the space is required.
   */
  async getContentById<T = Models.Content>(parameters: Parameters.GetContentById, callback: Callback<T>): Promise<void>;
  /**
   * Returns a single piece of content, like a page or a blog post.
   *
   * By default, the following objects are expanded: `space`, `history`, `version`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content. If the
   * content is a blog post, 'View' permission for the space is required.
   */
  async getContentById<T = Models.Content>(parameters: Parameters.GetContentById, callback?: never): Promise<T>;
  async getContentById<T = Models.Content>(
    parameters: Parameters.GetContentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}`,
      method: 'GET',
      params: {
        status: parameters.status,
        version: parameters.version,
        embeddedContentRender: parameters.embeddedContentRender,
        trigger: parameters.trigger,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a piece of content. Use this method to update the title or body of a piece of content, change the status,
   * change the parent page, and more.
   *
   * Note, updating draft content is currently not supported.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async updateContent<T = Models.Content>(parameters: Parameters.UpdateContent, callback: Callback<T>): Promise<void>;
  /**
   * Updates a piece of content. Use this method to update the title or body of a piece of content, change the status,
   * change the parent page, and more.
   *
   * Note, updating draft content is currently not supported.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async updateContent<T = Models.Content>(parameters: Parameters.UpdateContent, callback?: never): Promise<T>;
  async updateContent<T = Models.Content>(
    parameters: Parameters.UpdateContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}`,
      method: 'PUT',
      params: {
        status: parameters.status,
        conflictPolicy: parameters.conflictPolicy,
      },
      data: {
        version: parameters.version,
        title: parameters.title,
        type: parameters.type,
        status: parameters.statusBody,
        ancestors: parameters.ancestors,
        body: parameters.body,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Moves a piece of content to the space's trash or purges it from the trash, depending on the content's type and status:
   *
   * - If the content's type is `page` or `blogpost` and its status is `current`, it will be trashed.
   * - If the content's type is `page` or `blogpost` and its status is `trashed`, the content will be purged from the
   *   trash and deleted permanently. Note, you must also set the `status` query parameter to `trashed` in your request.
   * - If the content's type is `comment` or `attachment`, it will be deleted permanently without being trashed.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Delete' permission for the space that the
   * content is in, and permission to edit the content.
   */
  async deleteContent<T = void>(parameters: Parameters.DeleteContent, callback: Callback<T>): Promise<void>;
  /**
   * Moves a piece of content to the space's trash or purges it from the trash, depending on the content's type and status:
   *
   * - If the content's type is `page` or `blogpost` and its status is `current`, it will be trashed.
   * - If the content's type is `page` or `blogpost` and its status is `trashed`, the content will be purged from the
   *   trash and deleted permanently. Note, you must also set the `status` query parameter to `trashed` in your request.
   * - If the content's type is `comment` or `attachment`, it will be deleted permanently without being trashed.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Delete' permission for the space that the
   * content is in, and permission to edit the content.
   */
  async deleteContent<T = void>(parameters: Parameters.DeleteContent, callback?: never): Promise<T>;
  async deleteContent<T = void>(parameters: Parameters.DeleteContent, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}`,
      method: 'DELETE',
      params: {
        status: parameters.status,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the most recent update for a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getHistoryForContent<T = Models.ContentHistory>(
    parameters: Parameters.GetHistoryForContent,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the most recent update for a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getHistoryForContent<T = Models.ContentHistory>(
    parameters: Parameters.GetHistoryForContent,
    callback?: never
  ): Promise<T>;
  async getHistoryForContent<T = Models.ContentHistory>(
    parameters: Parameters.GetHistoryForContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/history`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
