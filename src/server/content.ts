import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';
import { Pagination } from '../pagination';

export class Content {
  constructor(private client: Client) {}

  /**
   * Returns a paginated list of Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content?spaceKey=TST&title=Cheese&expand=space,body.view,version,container
   *   - http://example.com/rest/api/content?type=blogpost&spaceKey=TST&title=Bacon&postingDay=2014-02-13&expand=space,body.view,version,container
   */
  async getContent<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContent | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a paginated list of Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content?spaceKey=TST&title=Cheese&expand=space,body.view,version,container
   *   - http://example.com/rest/api/content?type=blogpost&spaceKey=TST&title=Bacon&postingDay=2014-02-13&expand=space,body.view,version,container
   */
  async getContent<T = Pagination<Models.Content>>(parameters?: Parameters.GetContent, callback?: never): Promise<T>;
  async getContent<T = Pagination<Models.Content>>(
    parameters?: Parameters.GetContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/content',
      method: 'GET',
      params: {
        type: parameters?.type,
        spaceKey: parameters?.spaceKey,
        title: parameters?.title,
        status: parameters?.status,
        postingDay: parameters?.postingDay,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContent' });
  }

  /**
   * Creates a new piece of Content or publishes the draft if the content id is present.For the case publishing draft, a
   * new piece of content will be created and all metadata from the draft will be transferred into the newly created content.
   */
  async createContent<T = Models.Content>(
    parameters: Parameters.CreateContent | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a new piece of Content or publishes the draft if the content id is present.For the case publishing draft, a
   * new piece of content will be created and all metadata from the draft will be transferred into the newly created content.
   */
  async createContent<T = Models.Content>(parameters?: Parameters.CreateContent, callback?: never): Promise<T>;
  async createContent<T = Models.Content>(
    parameters?: Parameters.CreateContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/content',
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

    return this.client.sendRequest(config, callback, { methodName: 'server.createContent' });
  }

  /**
   * Updates a piece of Content, including changes to content status To update a piece of content you must increment the
   * version.number, supplying the number of the version you are creating. The title property can be updated on all
   * content, body can be updated on all content that has a body (not attachments).
   */
  async updateContent<T = Models.Content>(parameters: Parameters.UpdateContent, callback: Callback<T>): Promise<void>;
  /**
   * Updates a piece of Content, including changes to content status To update a piece of content you must increment the
   * version.number, supplying the number of the version you are creating. The title property can be updated on all
   * content, body can be updated on all content that has a body (not attachments).
   */
  async updateContent<T = Models.Content>(parameters: Parameters.UpdateContent, callback?: never): Promise<T>;
  async updateContent<T = Models.Content>(
    parameters: Parameters.UpdateContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}`,
      method: 'PUT',
      params: {
        status: parameters.status,
        conflictPolicy: parameters.conflictPolicy,
      },
      data: {
        ...parameters,
        status: undefined,
        conflictPolicy: undefined,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.updateContent' });
  }

  /**
   * Returns a piece of Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   http://example.com/rest/api/content/1234?expand=space,body.view,version,container
   *   http://example.com/rest/api/content/1234?status=any
   */
  async getContentById<T = Models.Content>(parameters: Parameters.GetContentById, callback: Callback<T>): Promise<void>;
  /**
   * Returns a piece of Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   http://example.com/rest/api/content/1234?expand=space,body.view,version,container
   *   http://example.com/rest/api/content/1234?status=any
   */
  async getContentById<T = Models.Content>(parameters: Parameters.GetContentById, callback?: never): Promise<T>;
  async getContentById<T = Models.Content>(
    parameters: Parameters.GetContentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}`,
      method: 'GET',
      params: {
        status: parameters.status,
        version: parameters.version,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentById' });
  }

  /**
   * Trashes or purges a piece of Content, based on its ContentType and ContentStatus. There are three cases:
   *
   * - If the content is trashable and its status is `current`, it will be trashed.
   * - If the content is trashable, its status is `trashed` and the "status" query parameter in the request is "trashed",
   *   the content will be purged from the trash and deleted permanently.
   * - If the content is not trashable it will be deleted permanently without being trashed.
   */
  async deleteContent<T = void>(parameters: Parameters.DeleteContent, callback: Callback<T>): Promise<void>;
  /**
   * Trashes or purges a piece of Content, based on its ContentType and ContentStatus. There are three cases:
   *
   * - If the content is trashable and its status is `current`, it will be trashed.
   * - If the content is trashable, its status is `trashed` and the "status" query parameter in the request is "trashed",
   *   the content will be purged from the trash and deleted permanently.
   * - If the content is not trashable it will be deleted permanently without being trashed.
   */
  async deleteContent<T = void>(parameters: Parameters.DeleteContent, callback?: never): Promise<T>;
  async deleteContent<T = void>(parameters: Parameters.DeleteContent, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}`,
      method: 'DELETE',
      params: {
        status: parameters.status,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.deleteContent' });
  }

  /**
   * Returns the history of a particular piece of content
   *
   * @example
   *   Example request URI(s):
   *
   *   http://example.com/rest/api/content/1234/history
   */
  async getHistory<T = Models.ContentHistory>(parameters: Parameters.GetHistory, callback: Callback<T>): Promise<void>;
  /**
   * Returns the history of a particular piece of content
   *
   * @example
   *   Example request URI(s):
   *
   *   http://example.com/rest/api/content/1234/history
   */
  async getHistory<T = Models.ContentHistory>(parameters: Parameters.GetHistory, callback?: never): Promise<T>;
  async getHistory<T = Models.ContentHistory>(
    parameters: Parameters.GetHistory,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/history`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getHistory' });
  }

  /**
   * Returns the body of a macro (in storage format) with the given hash. This resource is primarily used by connect
   * applications that require the body of macro to perform their work.
   *
   * The hash is generated by connect during render time of the local macro holder and is usually only relevant during
   * the scope of one request. For optimisation purposes, this hash will usually live for multiple requests.
   *
   * Collecting a macro by its hash should now be considered deprecated and will be replaced, transparently with
   * macroIds. This resource is currently only called from connect addons which will eventually all use the
   * {@link #getContentById(com.atlassian.confluence.api.model.content.id.ContentId, java.util.List, Integer, String)} resource.
   *
   * To make the migration as seamless as possible, this resource will match macros against a generated hash or a stored
   * macroId. This will allow add ons to work during the migration period.
   */
  async getMacroBodyByHash<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByHash,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the body of a macro (in storage format) with the given hash. This resource is primarily used by connect
   * applications that require the body of macro to perform their work.
   *
   * The hash is generated by connect during render time of the local macro holder and is usually only relevant during
   * the scope of one request. For optimisation purposes, this hash will usually live for multiple requests.
   *
   * Collecting a macro by its hash should now be considered deprecated and will be replaced, transparently with
   * macroIds. This resource is currently only called from connect addons which will eventually all use the
   * {@link #getContentById(com.atlassian.confluence.api.model.content.id.ContentId, java.util.List, Integer, String)} resource.
   *
   * To make the migration as seamless as possible, this resource will match macros against a generated hash or a stored
   * macroId. This will allow add ons to work during the migration period.
   */
  async getMacroBodyByHash<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByHash,
    callback?: never
  ): Promise<T>;
  async getMacroBodyByHash<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByHash,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/history/${parameters.version}/macro/hash/${parameters.hash}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getMacroBodyByHash' });
  }

  /**
   * Returns the body of a macro (in storage format) with the given id. This resource is primarily used by connect
   * applications that require the body of macro to perform their work.
   *
   * When content is created, if no macroId is specified, then Confluence will generate a random id. The id is persisted
   * as the content is saved and only modified by Confluence if there are conflicting IDs.
   *
   * To preserve backwards compatibility this resource will also match on the hash of the macro body, even if a macroId
   * is found. This check will become redundant as pages get macroId's generated for them and transparently propagate
   * out to all instances.
   */
  async getMacroBodyByMacroId<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByMacroId,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the body of a macro (in storage format) with the given id. This resource is primarily used by connect
   * applications that require the body of macro to perform their work.
   *
   * When content is created, if no macroId is specified, then Confluence will generate a random id. The id is persisted
   * as the content is saved and only modified by Confluence if there are conflicting IDs.
   *
   * To preserve backwards compatibility this resource will also match on the hash of the macro body, even if a macroId
   * is found. This check will become redundant as pages get macroId's generated for them and transparently propagate
   * out to all instances.
   */
  async getMacroBodyByMacroId<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByMacroId,
    callback?: never
  ): Promise<T>;
  async getMacroBodyByMacroId<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByMacroId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/history/${parameters.version}/macro/id/${parameters.macroId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getMacroBodyByMacroId' });
  }

  /**
   * Fetch a list of content using the Confluence Query Language (CQL). See: Advanced searching using CQL
   *
   * @example
   *   For example :
   *
   *   Example request URI(s):
   *
   *   - http://localhost:8080/confluence/rest/api/content/search?cql=creator=currentUser()&cqlcontext={%22spaceKey%22:%22TST%22,%22contentId%22:%2255%22}
   *   - http://localhost:8080/confluence/rest/api/content/search?cql=space=DEV%20AND%20label=docs&expand=space,metadata.labels&limit=10
   */
  async searchContent<T = Pagination<Models.Content>>(
    parameters: Parameters.SearchContent | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Fetch a list of content using the Confluence Query Language (CQL). See: Advanced searching using CQL
   *
   * @example
   *   For example :
   *
   *   Example request URI(s):
   *
   *   - http://localhost:8080/confluence/rest/api/content/search?cql=creator=currentUser()&cqlcontext={%22spaceKey%22:%22TST%22,%22contentId%22:%2255%22}
   *   - http://localhost:8080/confluence/rest/api/content/search?cql=space=DEV%20AND%20label=docs&expand=space,metadata.labels&limit=10
   */
  async searchContent<T = Pagination<Models.Content>>(
    parameters?: Parameters.SearchContent,
    callback?: never
  ): Promise<T>;
  async searchContent<T = Pagination<Models.Content>>(
    parameters?: Parameters.SearchContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/content/search',
      method: 'GET',
      params: {
        cql: parameters?.cql,
        cqlcontext: parameters?.cqlcontext,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.searchContent' });
  }

  /**
   * Returns a map of the direct children of a piece of Content. Content can have multiple types of children - for
   * example a Page can have children that are also Pages, but it can also have Comments and Attachments.
   *
   * The ContentType(s) of the children returned is specified by the "expand" query parameter in the request - this
   * parameter can include expands for multiple child types.
   *
   * If no types are included in the expand parameter, the map returned will just list the child types that are
   * available to be expanded for the Content referenced by the "id" path parameter.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child
   *   - http://example.com/rest/api/content/1234/child?expand=page.body.VIEW
   *   - http://example.com/rest/api/content/1234/child?expand=page&start=20&limit=10
   */
  async getContentChildren<T = unknown>(
    parameters: Parameters.GetContentChildren,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a map of the direct children of a piece of Content. Content can have multiple types of children - for
   * example a Page can have children that are also Pages, but it can also have Comments and Attachments.
   *
   * The ContentType(s) of the children returned is specified by the "expand" query parameter in the request - this
   * parameter can include expands for multiple child types.
   *
   * If no types are included in the expand parameter, the map returned will just list the child types that are
   * available to be expanded for the Content referenced by the "id" path parameter.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child
   *   - http://example.com/rest/api/content/1234/child?expand=page.body.VIEW
   *   - http://example.com/rest/api/content/1234/child?expand=page&start=20&limit=10
   */
  async getContentChildren<T = unknown>(parameters: Parameters.GetContentChildren, callback?: never): Promise<T>;
  async getContentChildren<T = unknown>(
    parameters: Parameters.GetContentChildren,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        parentVersion: parameters.parentVersion,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentChildren' });
  }

  /**
   * Returns the direct children of a piece of Content, limited to a single child type.
   *
   * The ContentType(s) of the children returned is specified by the "type" path parameter in the request.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/page
   *   - http://example.com/rest/api/content/1234/child/comment
   *   - http://example.com/rest/api/content/1234/child/page?expand=body.view
   *   - http://example.com/rest/api/content/1234/child/comment?start=20&limit=10
   */
  async getContentChildrenByType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentChildrenByType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the direct children of a piece of Content, limited to a single child type.
   *
   * The ContentType(s) of the children returned is specified by the "type" path parameter in the request.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/page
   *   - http://example.com/rest/api/content/1234/child/comment
   *   - http://example.com/rest/api/content/1234/child/page?expand=body.view
   *   - http://example.com/rest/api/content/1234/child/comment?start=20&limit=10
   */
  async getContentChildrenByType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentChildrenByType,
    callback?: never
  ): Promise<T>;
  async getContentChildrenByType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentChildrenByType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/${parameters.type}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        parentVersion: parameters.parentVersion,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentChildrenByType' });
  }

  /**
   * Returns the comments of a content
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/comment
   *   - http://example.com/rest/api/content/1234/child/comment?expand=body.view
   *   - http://example.com/rest/api/content/1234/child/comment?start=20&limit=10
   *   - http://example.com/rest/api/content/1234/child/comment?location=footer&location=inline&location=resolved
   *   - http://example.com/rest/api/content/1234/child/comment?expand=extensions.inlineProperties,extensions.resolution
   */
  async getContentComments<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentComments,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the comments of a content
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/comment
   *   - http://example.com/rest/api/content/1234/child/comment?expand=body.view
   *   - http://example.com/rest/api/content/1234/child/comment?start=20&limit=10
   *   - http://example.com/rest/api/content/1234/child/comment?location=footer&location=inline&location=resolved
   *   - http://example.com/rest/api/content/1234/child/comment?expand=extensions.inlineProperties,extensions.resolution
   */
  async getContentComments<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentComments,
    callback?: never
  ): Promise<T>;
  async getContentComments<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentComments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/comment`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        parentVersion: parameters.parentVersion,
        start: parameters.start,
        limit: parameters.limit,
        location: parameters.location,
        depth: parameters.depth,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentComments' });
  }

  /**
   * Returns a paginated list of attachment Content entities within a single container.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/attachment?start=0&limit=10
   *   - http://example.com/rest/api/content/1234/child/attachment?filename=myfile.txt&expand=version,container
   */
  async getAttachments<T = Pagination<Models.Content>>(
    parameters: Parameters.GetAttachments,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a paginated list of attachment Content entities within a single container.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/attachment?start=0&limit=10
   *   - http://example.com/rest/api/content/1234/child/attachment?filename=myfile.txt&expand=version,container
   */
  async getAttachments<T = Pagination<Models.Content>>(
    parameters: Parameters.GetAttachments,
    callback?: never
  ): Promise<T>;
  async getAttachments<T = Pagination<Models.Content>>(
    parameters: Parameters.GetAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/attachment`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
        filename: parameters.filename,
        mediaType: parameters.mediaType,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getAttachments' });
  }

  /**
   * Add one or more attachments to a Confluence Content entity, with optional comments.
   *
   * Comments are optional, but if included there must be as many comments as there are files, and the comments must be
   * in the same order as the files.
   *
   * This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
   * libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP
   * Components library provides a MultiPartEntity that makes it simple to submit a multipart POST.
   *
   * In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection
   * on it. This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be blocked.
   *
   * The name of the multipart/form-data parameter that contains attachments must be "file"
   *
   * A simple example to attach a file called "myfile.txt" to the container with id "123", with a comment included: curl
   * -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "comment=This is my File"
   * http://myhost/rest/api/content/123/child/attachment A example to attach a file called "myfile.txt" to the container
   * with id "123", with a comment, and set the minorEdits flag to be true: curl -D- -u admin:admin -X POST -H
   * "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "minorEdit=true" -F "comment=This is my File"
   * http://myhost/rest/api/content/123/child/attachment An example to attach the same file, with no comment: curl -D-
   * -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt"
   * http://myhost/rest/api/content/123/child/attachment
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/attachment
   */
  async createAttachments<T = Pagination<Models.Content>>(
    parameters: Parameters.CreateAttachments,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Add one or more attachments to a Confluence Content entity, with optional comments.
   *
   * Comments are optional, but if included there must be as many comments as there are files, and the comments must be
   * in the same order as the files.
   *
   * This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
   * libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP
   * Components library provides a MultiPartEntity that makes it simple to submit a multipart POST.
   *
   * In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection
   * on it. This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be blocked.
   *
   * The name of the multipart/form-data parameter that contains attachments must be "file"
   *
   * A simple example to attach a file called "myfile.txt" to the container with id "123", with a comment included: curl
   * -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "comment=This is my File"
   * http://myhost/rest/api/content/123/child/attachment A example to attach a file called "myfile.txt" to the container
   * with id "123", with a comment, and set the minorEdits flag to be true: curl -D- -u admin:admin -X POST -H
   * "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "minorEdit=true" -F "comment=This is my File"
   * http://myhost/rest/api/content/123/child/attachment An example to attach the same file, with no comment: curl -D-
   * -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt"
   * http://myhost/rest/api/content/123/child/attachment
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/attachment
   */
  async createAttachments<T = Pagination<Models.Content>>(
    parameters: Parameters.CreateAttachments,
    callback?: never
  ): Promise<T>;
  async createAttachments<T = Pagination<Models.Content>>(
    parameters: Parameters.CreateAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/attachment`,
      method: 'POST',
      params: {
        status: parameters.status,
      },
      data: {
        ...parameters,
        id: undefined,
        status: undefined,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.createAttachments' });
  }

  /**
   * Update the non-binary data of an Attachment.
   *
   * This resource can be used to update an attachment's filename, media-type, comment, and parent container.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/attachment/5678
   */
  async updateAttachmentProperties<T = Models.Content>(
    parameters: Parameters.UpdateAttachmentProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Update the non-binary data of an Attachment.
   *
   * This resource can be used to update an attachment's filename, media-type, comment, and parent container.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/attachment/5678
   */
  async updateAttachmentProperties<T = Models.Content>(
    parameters: Parameters.UpdateAttachmentProperties,
    callback?: never
  ): Promise<T>;
  async updateAttachmentProperties<T = Models.Content>(
    parameters: Parameters.UpdateAttachmentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/attachment/${parameters.attachmentId}`,
      method: 'PUT',
      data: {
        ...parameters,
        id: undefined,
        attachmentId: undefined,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.updateAttachmentProperties' });
  }

  /**
   * Update the binary data of an Attachment, and optionally the comment and the minor edit field. This adds a new
   * version of the attachment, containing the new binary data, filename, and content-type.
   *
   * When updating the binary data of an attachment, the comment related to it together with the field that specifies if
   * it's a minor edit can be updated as well, but are not required. If an update is considered to be a minor edit,
   * notifications will not be sent to the watchers of that content.
   *
   * This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
   * libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP
   * Components library provides a MultiPartEntity that makes it simple to submit a multipart POST.
   *
   * In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection
   * on it. This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be blocked.
   *
   * The name of the multipart/form-data parameter that contains attachments must be "file"
   *
   * A simple example to upload a file called "myfile.txt" to the Attachment with id "456" in a container with id "123",
   * with the comment updated, and minorEdit set to true: curl -D- -u admin:admin -X POST -H "X-Atlassian-Token:
   * nocheck" -F "file=@myfile.txt" -F "minorEdit=true" -F "comment=This is my updated File"
   * http://myhost/rest/api/content/123/child/attachment/456/data
   *
   * An example to upload the same file, with no comment: curl -D- -u admin:admin -X POST -H "X-Atlassian-Token:
   * nocheck" -F "file=@myfile.txt" http://myhost/rest/api/content/123/child/attachment/456/data
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/attachment/5678/data
   */
  async updateAttachmentData<T = Models.Content>(
    parameters: Parameters.UpdateAttachmentData,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Update the binary data of an Attachment, and optionally the comment and the minor edit field. This adds a new
   * version of the attachment, containing the new binary data, filename, and content-type.
   *
   * When updating the binary data of an attachment, the comment related to it together with the field that specifies if
   * it's a minor edit can be updated as well, but are not required. If an update is considered to be a minor edit,
   * notifications will not be sent to the watchers of that content.
   *
   * This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
   * libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP
   * Components library provides a MultiPartEntity that makes it simple to submit a multipart POST.
   *
   * In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection
   * on it. This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be blocked.
   *
   * The name of the multipart/form-data parameter that contains attachments must be "file"
   *
   * A simple example to upload a file called "myfile.txt" to the Attachment with id "456" in a container with id "123",
   * with the comment updated, and minorEdit set to true: curl -D- -u admin:admin -X POST -H "X-Atlassian-Token:
   * nocheck" -F "file=@myfile.txt" -F "minorEdit=true" -F "comment=This is my updated File"
   * http://myhost/rest/api/content/123/child/attachment/456/data
   *
   * An example to upload the same file, with no comment: curl -D- -u admin:admin -X POST -H "X-Atlassian-Token:
   * nocheck" -F "file=@myfile.txt" http://myhost/rest/api/content/123/child/attachment/456/data
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/child/attachment/5678/data
   */
  async updateAttachmentData<T = Models.Content>(
    parameters: Parameters.UpdateAttachmentData,
    callback?: never
  ): Promise<T>;
  async updateAttachmentData<T = Models.Content>(
    parameters: Parameters.UpdateAttachmentData,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/attachment/${parameters.attachmentId}/data`,
      method: 'POST',
      data: {
        ...parameters,
        id: undefined,
        attachmentId: undefined,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.updateAttachmentData' });
  }

  /**
   * Returns a map of the descendants of a piece of Content. Content can have multiple types of descendants - for
   * example a Page can have descendants that are also Pages, but it can also have Comments and Attachments.
   *
   * The ContentType(s) of the descendants returned is specified by the "expand" query parameter in the request - this
   * parameter can include expands for multiple descendant types.
   *
   * If no types are included in the expand parameter, the map returned will just list the descendant types that are
   * available to be expanded for the Content referenced by the "id" path parameter.
   *
   * Currently the only supported descendants are comment descendants of non-comment Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/descendant
   *   - http://example.com/rest/api/content/1234/descendant?expand=comment.body.VIEW
   *   - http://example.com/rest/api/content/1234/descendant?expand=comment
   */
  async getContentDescendants<T = Models.ContentChildren>(
    parameters: Parameters.GetContentDescendants,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a map of the descendants of a piece of Content. Content can have multiple types of descendants - for
   * example a Page can have descendants that are also Pages, but it can also have Comments and Attachments.
   *
   * The ContentType(s) of the descendants returned is specified by the "expand" query parameter in the request - this
   * parameter can include expands for multiple descendant types.
   *
   * If no types are included in the expand parameter, the map returned will just list the descendant types that are
   * available to be expanded for the Content referenced by the "id" path parameter.
   *
   * Currently the only supported descendants are comment descendants of non-comment Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/descendant
   *   - http://example.com/rest/api/content/1234/descendant?expand=comment.body.VIEW
   *   - http://example.com/rest/api/content/1234/descendant?expand=comment
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
      url: `/rest/content/${parameters.id}/descendant`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentDescendants' });
  }

  /**
   * Returns the direct descendants of a piece of Content, limited to a single descendant type.
   *
   * The ContentType(s) of the descendants returned is specified by the "type" path parameter in the request.
   *
   * Currently the only supported descendants are comment descendants of non-comment Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/descendant/comment
   *   - http://example.com/rest/api/content/1234/descendant/comment?expand=body.VIEW
   *   - http://example.com/rest/api/content/1234/descendant/comment?start=20&limit=10
   */
  async getContentDescendantsOfType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentDescendantsOfType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the direct descendants of a piece of Content, limited to a single descendant type.
   *
   * The ContentType(s) of the descendants returned is specified by the "type" path parameter in the request.
   *
   * Currently the only supported descendants are comment descendants of non-comment Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/descendant/comment
   *   - http://example.com/rest/api/content/1234/descendant/comment?expand=body.VIEW
   *   - http://example.com/rest/api/content/1234/descendant/comment?start=20&limit=10
   */
  async getContentDescendantsOfType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentDescendantsOfType,
    callback?: never
  ): Promise<T>;
  async getContentDescendantsOfType<T = Pagination<Models.Content>>(
    parameters: Parameters.GetContentDescendantsOfType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/descendant/${parameters.type}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentDescendantsOfType' });
  }

  /**
   * Returns the list of labels on a piece of Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/label
   *   - http://example.com/rest/api/content/1234/label?prefix=global&start=0&limit=200
   */
  async getContentLabels<T = Pagination<Models.Label>>(
    parameters: Parameters.GetContentLabels,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the list of labels on a piece of Content.
   *
   * @example
   *   Example request URI(s):
   *
   *   - http://example.com/rest/api/content/1234/label
   *   - http://example.com/rest/api/content/1234/label?prefix=global&start=0&limit=200
   */
  async getContentLabels<T = Pagination<Models.Label>>(
    parameters: Parameters.GetContentLabels,
    callback?: never
  ): Promise<T>;
  async getContentLabels<T = Pagination<Models.Label>>(
    parameters: Parameters.GetContentLabels,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/label`,
      method: 'GET',
      params: {
        prefix: parameters?.prefix,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentLabels' });
  }

  /** Adds a list of labels to the specified content. The body is the json representation of the list. */
  async addLabelsToContent<T = Pagination<Models.Label>>(
    parameters: Parameters.AddLabelsToContent,
    callback: Callback<T>
  ): Promise<void>;
  /** Adds a list of labels to the specified content. The body is the json representation of the list. */
  async addLabelsToContent<T = Pagination<Models.Label>>(
    parameters: Parameters.AddLabelsToContent,
    callback?: never
  ): Promise<T>;
  async addLabelsToContent<T = Pagination<Models.Label>>(
    parameters: Parameters.AddLabelsToContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/label`,
      method: 'POST',
      data: parameters.labels,
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.addLabelsToContent' });
  }

  /** Deletes a labels to the specified content. */
  async deleteLabelWithQueryParam<T = void>(
    parameters: Parameters.DeleteLabelWithQueryParam,
    callback: Callback<T>
  ): Promise<void>;
  /** Deletes a labels to the specified content. */
  async deleteLabelWithQueryParam<T = void>(
    parameters: Parameters.DeleteLabelWithQueryParam,
    callback?: never
  ): Promise<T>;
  async deleteLabelWithQueryParam<T = void>(
    parameters: Parameters.DeleteLabelWithQueryParam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/label`,
      method: 'DELETE',
      params: {
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.deleteLabelWithQueryParam' });
  }

  /**
   * Deletes a labels to the specified content. When calling this method through REST the label parameter doesn't accept
   * "/" characters in label names, because of security constraints. For this case please use the query parameter
   * version of this method (/content/{id}/label?name={label}Responses
   */
  async deleteLabel<T = void>(parameters: Parameters.DeleteLabel, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a labels to the specified content. When calling this method through REST the label parameter doesn't accept
   * "/" characters in label names, because of security constraints. For this case please use the query parameter
   * version of this method (/content/{id}/label?name={label}Responses
   */
  async deleteLabel<T = void>(parameters: Parameters.DeleteLabel, callback?: never): Promise<T>;
  async deleteLabel<T = void>(parameters: Parameters.DeleteLabel, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/label/${parameters.labelId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.deleteLabel' });
  }

  /**
   * Returns a paginated list of content properties.
   *
   * @example
   *   Example request URI:
   *
   *   - http://example.com/rest/api/content/1234/property?expand=content,version
   */
  async getContentProperties<T = Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetContentProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a paginated list of content properties.
   *
   * @example
   *   Example request URI:
   *
   *   - http://example.com/rest/api/content/1234/property?expand=content,version
   */
  async getContentProperties<T = Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetContentProperties,
    callback?: never
  ): Promise<T>;
  async getContentProperties<T = Pagination<Models.ContentProperty>>(
    parameters: Parameters.GetContentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentProperties' });
  }

  /** Creates a new content property. */
  async createContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /** Creates a new content property. */
  async createContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentProperty,
    callback?: never
  ): Promise<T>;
  async createContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property`,
      method: 'POST',
      data: {
        key: parameters.key,
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.createContentProperty' });
  }

  /**
   * Returns a content property.
   *
   * @example
   *   Example request URI:
   *
   *   - http://example.com/rest/api/content/1234/property/example-property-key?expand=content,version
   */
  async getContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.GetContentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a content property.
   *
   * @example
   *   Example request URI:
   *
   *   - http://example.com/rest/api/content/1234/property/example-property-key?expand=content,version
   */
  async getContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.GetContentProperty,
    callback?: never
  ): Promise<T>;
  async getContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.GetContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property/${parameters.key}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getContentProperty' });
  }

  /** Creates a new content property. */
  async createContentPropertyForKey<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentPropertyForKey,
    callback: Callback<T>
  ): Promise<void>;
  /** Creates a new content property. */
  async createContentPropertyForKey<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentPropertyForKey,
    callback?: never
  ): Promise<T>;
  async createContentPropertyForKey<T = Models.ContentProperty>(
    parameters: Parameters.CreateContentPropertyForKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property/${parameters.key}`,
      method: 'POST',
      data: {
        value: parameters.value,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.createContentPropertyForKey' });
  }

  /**
   * Updates a content property. The body contains the representation of the content property. Must include the property
   * id, and the new version number. Attempts to create a new content property if the given version number is 1, just
   * like
   * {@link #create(com.atlassian.confluence.api.model.content.id.ContentId,
   * String, com.atlassian.confluence.api.model.content.JsonContentProperty)}.
   */
  async updateContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.UpdateContentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a content property. The body contains the representation of the content property. Must include the property
   * id, and the new version number. Attempts to create a new content property if the given version number is 1, just
   * like
   * {@link #create(com.atlassian.confluence.api.model.content.id.ContentId,
   * String, com.atlassian.confluence.api.model.content.JsonContentProperty)}.
   */
  async updateContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.UpdateContentProperty,
    callback?: never
  ): Promise<T>;
  async updateContentProperty<T = Models.ContentProperty>(
    parameters: Parameters.UpdateContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property/${parameters.key}`,
      method: 'PUT',
      data: {
        value: parameters.value,
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.updateContentProperty' });
  }

  /** Deletes a content property. */
  async deleteContentProperty<T = void>(
    parameters: Parameters.DeleteContentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /** Deletes a content property. */
  async deleteContentProperty<T = void>(parameters: Parameters.DeleteContentProperty, callback?: never): Promise<T>;
  async deleteContentProperty<T = void>(
    parameters: Parameters.DeleteContentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property/${parameters.key}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.deleteContentProperty' });
  }

  /** Returns info about all restrictions by operation */
  async getRestrictionsByOperation<T = Models.RestrictionsByOperation>(
    parameters: Parameters.GetRestrictionsByOperation,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns info about all restrictions by operation */
  async getRestrictionsByOperation<T = Models.RestrictionsByOperation>(
    parameters: Parameters.GetRestrictionsByOperation,
    callback?: never
  ): Promise<T>;
  async getRestrictionsByOperation<T = Models.RestrictionsByOperation>(
    parameters: Parameters.GetRestrictionsByOperation,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/restriction/byOperation`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getRestrictionsByOperation' });
  }

  /** Returns info about all restrictions of given operation */
  async getRestrictionsForOperation<T = Models.ContentRestriction>(
    parameters: Parameters.GetRestrictionsForOperation,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns info about all restrictions of given operation */
  async getRestrictionsForOperation<T = Models.ContentRestriction>(
    parameters: Parameters.GetRestrictionsForOperation,
    callback?: never
  ): Promise<T>;
  async getRestrictionsForOperation<T = Models.ContentRestriction>(
    parameters: Parameters.GetRestrictionsForOperation,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getRestrictionsForOperation' });
  }

  /** Publishes a legacy draft of a Content created from a ContentBlueprint */
  async publishLegacyDraft<T = Models.Content>(
    parameters: Parameters.PublishLegacyDraft,
    callback: Callback<T>
  ): Promise<void>;
  /** Publishes a legacy draft of a Content created from a ContentBlueprint */
  async publishLegacyDraft<T = Models.Content>(parameters: Parameters.PublishLegacyDraft, callback?: never): Promise<T>;
  async publishLegacyDraft<T = Models.Content>(
    parameters: Parameters.PublishLegacyDraft,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/blueprint/instance/${parameters.draftId}`,
      method: 'POST',
      params: {
        status: parameters.status,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.publishLegacyDraft' });
  }

  /** Publishes a shared draft of a Content created from a ContentBlueprint */
  async publishSharedDraft<T = Models.Content>(
    parameters: Parameters.PublishSharedDraft,
    callback: Callback<T>
  ): Promise<void>;
  /** Publishes a shared draft of a Content created from a ContentBlueprint */
  async publishSharedDraft<T = Models.Content>(parameters: Parameters.PublishSharedDraft, callback?: never): Promise<T>;
  async publishSharedDraft<T = Models.Content>(
    parameters: Parameters.PublishSharedDraft,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/blueprint/instance/${parameters.draftId}`,
      method: 'PUT',
      params: {
        status: parameters.status,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.publishSharedDraft' });
  }
}
