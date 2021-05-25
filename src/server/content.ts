import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Content {
  constructor(private client: Client) {}

  /**
   * Returns a paginated list of Content.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content?spaceKey=TST&title=Cheese&expand=space,body.view,version,container
   *                              http://example.com/rest/api/content?type=blogpost&spaceKey=TST&title=Bacon&postingDay=2014-02-13&expand=space,body.view,version,container
   */
  async getContent<T = unknown>(parameters: Parameters.GetContent | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a paginated list of Content.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content?spaceKey=TST&title=Cheese&expand=space,body.view,version,container
   *                              http://example.com/rest/api/content?type=blogpost&spaceKey=TST&title=Bacon&postingDay=2014-02-13&expand=space,body.view,version,container
   */
  async getContent<T = unknown>(parameters?: Parameters.GetContent, callback?: never): Promise<T>;
  async getContent<T = unknown>(parameters?: Parameters.GetContent, callback?: Callback<T>): Promise<void | T> {
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

    return this.client.sendRequest(config, callback, { methodName: 'getContent' });
  }

  /**
   * Creates a new piece of Content or publishes the draft if the content id is present.For the case publishing draft, a
   * new piece of content will be created and all metadata from the draft will be transferred into the newly created content.
   */
  async createContent<T = unknown>(
    parameters: Parameters.CreateContent | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a new piece of Content or publishes the draft if the content id is present.For the case publishing draft, a
   * new piece of content will be created and all metadata from the draft will be transferred into the newly created content.
   */
  async createContent<T = unknown>(parameters?: Parameters.CreateContent, callback?: never): Promise<T>;
  async createContent<T = unknown>(parameters?: Parameters.CreateContent, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/content',
      method: 'POST',
      params: {
        status: parameters?.status,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'createContent' });
  }

  /**
   * Updates a piece of Content, including changes to content status To update a piece of content you must increment the
   * version.number, supplying the number of the version you are creating. The title property can be updated on all
   * content, body can be updated on all content that has a body (not attachments). For instance to update the content
   * of a blogpost that currently has version 1: PUT /rest/api/content/456
   *
   *                                  {
   *                              "version":{
   *                              "number": 2
   *                              },
   *                              "title":"My new title",
   *                              "type":"page",
   *                              "body":{
   *                              "storage":{
   *                              "value":"<p>New page data.</p>",
   *                              "representation":"storage"
   *                              }
   *                              }
   *                              }
   *
   *                              To update a page and change its parent page, supply the ancestors property with the request with the parent as
   *                              the first ancestor i.e. to move a page to be a child of page with ID 789:
   *                              PUT /rest/api/content/456
   *
   *                              {
   *                              "version":{
   *                              "number": 2
   *                              },
   *                              "ancestors": [{"id":789}],
   *                              "type":"page",
   *                              "body":{
   *                              "storage":{
   *                              "value":"<p>New page data.</p>",
   *                              "representation":"storage"
   *                              }
   *                              }
   *                              }
   *
   *                              Changing status
   *                              To restore a piece of content that has the status of trashed the content must have it's version
   *                              incremented, and status set to current. No other field modifications will be performed when restoring
   *                              a piece of content from the trash.
   *                              Request example to restore from trash: {"id": "557059","status": "current","version": {"number": 2}}
   *                              If the content you're updating has a draft, specifying status=draft will delete that draft and the body of
   *                              the content will be replaced with the body specified in the request.
   *                              Request example to delete a draft:
   *                              PUT:  http://localhost:9096/confluence/rest/api/content/2149384202?status=draft
   *
   *                              {
   *                              "id":"2149384202",
   *                              "status":"current",
   *                              "version":{
   *                              "number":4
   *                              },
   *                              "space":{
   *                              "key":"TST"
   *                              },
   *                              "type":"page",
   *                              "title":"page title",
   *                              "body":{
   *                              "storage":{
   *                              "value":"<p>New page data.</p>",
   *                              "representation":"storage"
   *                              }
   *                              }
   *                              }
   *
   *                              Updating a draft is not currently supported.
   */
  async update<T = unknown>(parameters: Parameters.Update | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Updates a piece of Content, including changes to content status To update a piece of content you must increment the
   * version.number, supplying the number of the version you are creating. The title property can be updated on all
   * content, body can be updated on all content that has a body (not attachments). For instance to update the content
   * of a blogpost that currently has version 1: PUT /rest/api/content/456
   *
   *                                  {
   *                              "version":{
   *                              "number": 2
   *                              },
   *                              "title":"My new title",
   *                              "type":"page",
   *                              "body":{
   *                              "storage":{
   *                              "value":"<p>New page data.</p>",
   *                              "representation":"storage"
   *                              }
   *                              }
   *                              }
   *
   *                              To update a page and change its parent page, supply the ancestors property with the request with the parent as
   *                              the first ancestor i.e. to move a page to be a child of page with ID 789:
   *                              PUT /rest/api/content/456
   *
   *                              {
   *                              "version":{
   *                              "number": 2
   *                              },
   *                              "ancestors": [{"id":789}],
   *                              "type":"page",
   *                              "body":{
   *                              "storage":{
   *                              "value":"<p>New page data.</p>",
   *                              "representation":"storage"
   *                              }
   *                              }
   *                              }
   *
   *                              Changing status
   *                              To restore a piece of content that has the status of trashed the content must have it's version
   *                              incremented, and status set to current. No other field modifications will be performed when restoring
   *                              a piece of content from the trash.
   *                              Request example to restore from trash: {"id": "557059","status": "current","version": {"number": 2}}
   *                              If the content you're updating has a draft, specifying status=draft will delete that draft and the body of
   *                              the content will be replaced with the body specified in the request.
   *                              Request example to delete a draft:
   *                              PUT:  http://localhost:9096/confluence/rest/api/content/2149384202?status=draft
   *
   *                              {
   *                              "id":"2149384202",
   *                              "status":"current",
   *                              "version":{
   *                              "number":4
   *                              },
   *                              "space":{
   *                              "key":"TST"
   *                              },
   *                              "type":"page",
   *                              "title":"page title",
   *                              "body":{
   *                              "storage":{
   *                              "value":"<p>New page data.</p>",
   *                              "representation":"storage"
   *                              }
   *                              }
   *                              }
   *
   *                              Updating a draft is not currently supported.
   */
  async update<T = unknown>(parameters?: Parameters.Update, callback?: never): Promise<T>;
  async update<T = unknown>(parameters?: Parameters.Update, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.contentId}`,
      method: 'PUT',
      params: {
        status: parameters?.status,
        conflictPolicy: parameters?.conflictPolicy,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'update' });
  }

  /**
   * Returns a piece of Content.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234?expand=space,body.view,version,container
   *                              http://example.com/rest/api/content/1234?status=any
   */
  async getContentById<T = unknown>(
    parameters: Parameters.GetContentById | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a piece of Content.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234?expand=space,body.view,version,container
   *                              http://example.com/rest/api/content/1234?status=any
   */
  async getContentById<T = unknown>(parameters?: Parameters.GetContentById, callback?: never): Promise<T>;
  async getContentById<T = unknown>(parameters?: Parameters.GetContentById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}`,
      method: 'GET',
      params: {
        status: parameters?.status,
        version: parameters?.version,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getContentById' });
  }

  /**
   * Trashes or purges a piece of Content, based on its {@link ContentType} and {@link ContentStatus}.
   *
   *                                  There are three cases:
   *
   *
   *                              If the content is trashable and its status is {@link ContentStatus#CURRENT}, it will be trashed.
   *
   *
   *                              If the content is trashable, its status is {@link ContentStatus#TRASHED} and the "status" query parameter in the request is
   *                              "trashed",
   *                              the content will be purged from the trash and deleted permanently.
   *
   *
   *                              If the content is not trashable it will be deleted permanently without being trashed.
   */
  async delete<T = unknown>(parameters: Parameters.Delete | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Trashes or purges a piece of Content, based on its {@link ContentType} and {@link ContentStatus}.
   *
   *                                  There are three cases:
   *
   *
   *                              If the content is trashable and its status is {@link ContentStatus#CURRENT}, it will be trashed.
   *
   *
   *                              If the content is trashable, its status is {@link ContentStatus#TRASHED} and the "status" query parameter in the request is
   *                              "trashed",
   *                              the content will be purged from the trash and deleted permanently.
   *
   *
   *                              If the content is not trashable it will be deleted permanently without being trashed.
   */
  async delete<T = unknown>(parameters?: Parameters.Delete, callback?: never): Promise<T>;
  async delete<T = unknown>(parameters?: Parameters.Delete, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}`,
      method: 'DELETE',
      params: {
        status: parameters?.status,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'delete' });
  }

  /**
   * Returns the history of a particular piece of content
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/history
   */
  async getHistory<T = unknown>(parameters: Parameters.GetHistory | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns the history of a particular piece of content
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/history
   */
  async getHistory<T = unknown>(parameters?: Parameters.GetHistory, callback?: never): Promise<T>;
  async getHistory<T = unknown>(parameters?: Parameters.GetHistory, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/history`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getHistory' });
  }

  /**
   * Returns the body of a macro (in storage format) with the given hash. This resource is primarily used by connect
   * applications that require the body of macro to perform their work.
   *
   *                                  The hash is generated by connect during render time of the local macro holder and is usually only relevant during
   *                              the scope of one request.  For optimisation purposes, this hash will usually live for multiple requests.
   *
   *
   *                              Collecting a macro by its hash should now be considered deprecated and will be replaced, transparently with
   *                              macroIds.  This resource is currently only called from connect addons which will eventually all use the
   *                              {@link #getContentById(com.atlassian.confluence.api.model.content.id.ContentId, java.util.List, Integer, String)}
   *                              resource.
   *
   *
   *                              To make the migration as seamless as possible, this resource will match macros against a generated hash or
   *                              a stored macroId.  This will allow add ons to work during the migration period.
   *                              Responses
   */
  async getMacroBodyByHash<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the body of a macro (in storage format) with the given hash. This resource is primarily used by connect
   * applications that require the body of macro to perform their work.
   *
   *                                  The hash is generated by connect during render time of the local macro holder and is usually only relevant during
   *                              the scope of one request.  For optimisation purposes, this hash will usually live for multiple requests.
   *
   *
   *                              Collecting a macro by its hash should now be considered deprecated and will be replaced, transparently with
   *                              macroIds.  This resource is currently only called from connect addons which will eventually all use the
   *                              {@link #getContentById(com.atlassian.confluence.api.model.content.id.ContentId, java.util.List, Integer, String)}
   *                              resource.
   *
   *
   *                              To make the migration as seamless as possible, this resource will match macros against a generated hash or
   *                              a stored macroId.  This will allow add ons to work during the migration period.
   *                              Responses
   */
  async getMacroBodyByHash<T = unknown>(callback?: never): Promise<T>;
  async getMacroBodyByHash<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/history/${parameters.version}/macro/hash/${parameters.hash}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'getMacroBodyByHash' });
  }

  /**
   * Returns the body of a macro (in storage format) with the given id. This resource is primarily used by connect
   * applications that require the body of macro to perform their work.
   *
   *                                  When content is created, if no macroId is specified, then Confluence will generate a random id.  The id is
   *                              persisted as the content is saved and only modified by Confluence if there are conflicting IDs.
   *
   *
   *                              To preserve backwards compatibility this resource will also match on the hash of the macro body, even if a macroId
   *                              is found.  This check will become redundant as pages get macroId's generated for them and transparently
   *                              propagate out to all instances.
   *                              Responses
   */
  async getMacroBodyByMacroId<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the body of a macro (in storage format) with the given id. This resource is primarily used by connect
   * applications that require the body of macro to perform their work.
   *
   *                                  When content is created, if no macroId is specified, then Confluence will generate a random id.  The id is
   *                              persisted as the content is saved and only modified by Confluence if there are conflicting IDs.
   *
   *
   *                              To preserve backwards compatibility this resource will also match on the hash of the macro body, even if a macroId
   *                              is found.  This check will become redundant as pages get macroId's generated for them and transparently
   *                              propagate out to all instances.
   *                              Responses
   */
  async getMacroBodyByMacroId<T = unknown>(callback?: never): Promise<T>;
  async getMacroBodyByMacroId<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/history/${parameters.version}/macro/id/${parameters.macroId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'getMacroBodyByMacroId' });
  }

  /**
   * Fetch a list of content using the Confluence Query Language (CQL). See : Advanced searching using CQL
   *
   *                                  For example :
   *
   *                              Example request URI(s):
   *
   *                              http://localhost:8080/confluence/rest/api/content/search?cql=creator=currentUser()&cqlcontext={%22spaceKey%22:%22TST%22,
   *                              %22contentId%22:%2255%22}
   *                              http://localhost:8080/confluence/rest/api/content/search?cql=space=DEV%20AND%20label=docs&expand=space,metadata.labels&limit=10
   */
  async search<T = unknown>(parameters: Parameters.Search | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Fetch a list of content using the Confluence Query Language (CQL). See : Advanced searching using CQL
   *
   *                                  For example :
   *
   *                              Example request URI(s):
   *
   *                              http://localhost:8080/confluence/rest/api/content/search?cql=creator=currentUser()&cqlcontext={%22spaceKey%22:%22TST%22,
   *                              %22contentId%22:%2255%22}
   *                              http://localhost:8080/confluence/rest/api/content/search?cql=space=DEV%20AND%20label=docs&expand=space,metadata.labels&limit=10
   */
  async search<T = unknown>(parameters?: Parameters.Search, callback?: never): Promise<T>;
  async search<T = unknown>(parameters?: Parameters.Search, callback?: Callback<T>): Promise<void | T> {
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

    return this.client.sendRequest(config, callback, { methodName: 'search' });
  }

  /**
   * Returns a map of the direct children of a piece of Content. Content can have multiple types of children - for
   * example a Page can have children that are also Pages, but it can also have Comments and Attachments.
   *
   *                                  The {@link ContentType}(s) of the children returned is specified by the "expand" query parameter in the request
   *                              - this parameter can include expands for multiple child types.
   *
   *                              If no types are included in the expand parameter, the map returned will just list the child types that are available
   *                              to be expanded for the {@link Content} referenced by the "id" path parameter.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child
   *                              http://example.com/rest/api/content/1234/child?expand=page.body.VIEW
   *                              http://example.com/rest/api/content/1234/child?expand=page&start=20&limit=10
   */
  async children<T = unknown>(parameters: Parameters.Children | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a map of the direct children of a piece of Content. Content can have multiple types of children - for
   * example a Page can have children that are also Pages, but it can also have Comments and Attachments.
   *
   *                                  The {@link ContentType}(s) of the children returned is specified by the "expand" query parameter in the request
   *                              - this parameter can include expands for multiple child types.
   *
   *                              If no types are included in the expand parameter, the map returned will just list the child types that are available
   *                              to be expanded for the {@link Content} referenced by the "id" path parameter.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child
   *                              http://example.com/rest/api/content/1234/child?expand=page.body.VIEW
   *                              http://example.com/rest/api/content/1234/child?expand=page&start=20&limit=10
   */
  async children<T = unknown>(parameters?: Parameters.Children, callback?: never): Promise<T>;
  async children<T = unknown>(parameters?: Parameters.Children, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        parentVersion: parameters?.parentVersion,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'children' });
  }

  /**
   * Returns the direct children of a piece of Content, limited to a single child type.
   *
   *                                  The {@link ContentType}(s) of the children returned is specified by the "type" path parameter in the request.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/page
   *                              http://example.com/rest/api/content/1234/child/comment
   *                              http://example.com/rest/api/content/1234/child/page?expand=body.view
   *                              http://example.com/rest/api/content/1234/child/comment?start=20&limit=10
   */
  async childrenOfType<T = unknown>(
    parameters: Parameters.ChildrenOfType | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the direct children of a piece of Content, limited to a single child type.
   *
   *                                  The {@link ContentType}(s) of the children returned is specified by the "type" path parameter in the request.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/page
   *                              http://example.com/rest/api/content/1234/child/comment
   *                              http://example.com/rest/api/content/1234/child/page?expand=body.view
   *                              http://example.com/rest/api/content/1234/child/comment?start=20&limit=10
   */
  async childrenOfType<T = unknown>(parameters?: Parameters.ChildrenOfType, callback?: never): Promise<T>;
  async childrenOfType<T = unknown>(parameters?: Parameters.ChildrenOfType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/${parameters.type}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        parentVersion: parameters?.parentVersion,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'childrenOfType' });
  }

  /**
   * Returns the comments of a content
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/comment
   *                              http://example.com/rest/api/content/1234/child/comment?expand=body.view
   *                              http://example.com/rest/api/content/1234/child/comment?start=20&limit=10
   *                              http://example.com/rest/api/content/1234/child/comment?location=footer&location=inline&location=resolved
   *                              http://example.com/rest/api/content/1234/child/comment?expand=extensions.inlineProperties,extensions.resolution
   */
  async commentsOfContent<T = unknown>(
    parameters: Parameters.CommentsOfContent | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the comments of a content
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/comment
   *                              http://example.com/rest/api/content/1234/child/comment?expand=body.view
   *                              http://example.com/rest/api/content/1234/child/comment?start=20&limit=10
   *                              http://example.com/rest/api/content/1234/child/comment?location=footer&location=inline&location=resolved
   *                              http://example.com/rest/api/content/1234/child/comment?expand=extensions.inlineProperties,extensions.resolution
   */
  async commentsOfContent<T = unknown>(parameters?: Parameters.CommentsOfContent, callback?: never): Promise<T>;
  async commentsOfContent<T = unknown>(
    parameters?: Parameters.CommentsOfContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/comment`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        parentVersion: parameters?.parentVersion,
        start: parameters?.start,
        limit: parameters?.limit,
        location: parameters?.location,
        depth: parameters?.depth,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'commentsOfContent' });
  }

  /**
   * Returns a paginated list of attachment Content entities within a single container.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/attachment?start=0&limit=10
   *                              http://example.com/rest/api/content/1234/child/attachment?filename=myfile.txt&expand=version,container
   */
  async getAttachments<T = unknown>(
    parameters: Parameters.GetAttachments | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a paginated list of attachment Content entities within a single container.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/attachment?start=0&limit=10
   *                              http://example.com/rest/api/content/1234/child/attachment?filename=myfile.txt&expand=version,container
   */
  async getAttachments<T = unknown>(parameters?: Parameters.GetAttachments, callback?: never): Promise<T>;
  async getAttachments<T = unknown>(parameters?: Parameters.GetAttachments, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/attachment`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
        filename: parameters?.filename,
        mediaType: parameters?.mediaType,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getAttachments' });
  }

  /**
   * Add one or more attachments to a Confluence Content entity, with optional comments.
   *
   *                                  Comments are optional, but if included there must be as many comments as there are files, and the comments
   *                              must be in the same order as the files.
   *
   *                              This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
   *                              libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP Components
   *                              library provides a
   *                              MultiPartEntity
   *                              that makes it simple to submit a multipart POST.
   *
   *                              In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection
   *                              on it.  This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be
   *                              blocked.
   *
   *                              The name of the multipart/form-data parameter that contains attachments must be "file"
   *
   *                              A simple example to attach a file called "myfile.txt" to the container with id "123", with a comment included:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "comment=This is my File" http://myhost/rest/api/content/123/child/attachment
   *                              A example to attach a file called "myfile.txt" to the container with id "123", with a comment, and set the minorEdits flag
   *                              to be true:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "minorEdit=true" -F "comment=This
   *                              is my File" http://myhost/rest/api/content/123/child/attachment
   *                              An example to attach the same file, with no comment:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" http://myhost/rest/api/content/123/child/attachment
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/attachment
   */
  async createAttachments<T = unknown>(
    parameters: Parameters.CreateAttachments | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Add one or more attachments to a Confluence Content entity, with optional comments.
   *
   *                                  Comments are optional, but if included there must be as many comments as there are files, and the comments
   *                              must be in the same order as the files.
   *
   *                              This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
   *                              libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP Components
   *                              library provides a
   *                              MultiPartEntity
   *                              that makes it simple to submit a multipart POST.
   *
   *                              In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection
   *                              on it.  This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be
   *                              blocked.
   *
   *                              The name of the multipart/form-data parameter that contains attachments must be "file"
   *
   *                              A simple example to attach a file called "myfile.txt" to the container with id "123", with a comment included:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "comment=This is my File" http://myhost/rest/api/content/123/child/attachment
   *                              A example to attach a file called "myfile.txt" to the container with id "123", with a comment, and set the minorEdits flag
   *                              to be true:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "minorEdit=true" -F "comment=This
   *                              is my File" http://myhost/rest/api/content/123/child/attachment
   *                              An example to attach the same file, with no comment:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" http://myhost/rest/api/content/123/child/attachment
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/attachment
   */
  async createAttachments<T = unknown>(parameters?: Parameters.CreateAttachments, callback?: never): Promise<T>;
  async createAttachments<T = unknown>(
    parameters?: Parameters.CreateAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/attachment`,
      method: 'POST',
      params: {
        status: parameters?.status,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'createAttachments' });
  }

  /**
   * Update the non-binary data of an Attachment.
   *
   *                                  This resource can be used to update an attachment's filename, media-type, comment, and parent container.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/attachment/5678
   */
  async update<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Update the non-binary data of an Attachment.
   *
   *                                  This resource can be used to update an attachment's filename, media-type, comment, and parent container.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/attachment/5678
   */
  async update<T = unknown>(callback?: never): Promise<T>;
  async update<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/attachment/${parameters.attachmentId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'update' });
  }

  /**
   * Update the binary data of an Attachment, and optionally the comment and the minor edit field. This adds a new
   * version of the attachment, containing the new binary data, filename, and content-type.
   *
   *                                  When updating the binary data of an attachment, the comment related to it together with the field that
   *                              specifies if it's a minor edit can be updated as well, but are not required.
   *                              If an update is considered to be a minor edit, notifications will not be sent to the watchers of that content.
   *
   *                              This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
   *                              libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP Components
   *                              library provides a
   *                              MultiPartEntity
   *                              that makes it simple to submit a multipart POST.
   *
   *
   *                              In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection
   *                              on it.  This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be
   *                              blocked.
   *
   *
   *                              The name of the multipart/form-data parameter that contains attachments must be "file"
   *
   *
   *                              A simple example to upload a file called "myfile.txt" to the Attachment with id "456" in a container with id "123", with the
   *                              comment updated, and minorEdit set to true:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "minorEdit=true" -F "comment=This
   *                              is my updated File" http://myhost/rest/api/content/123/child/attachment/456/data
   *
   *                              An example to upload the same file, with no comment:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" http://myhost/rest/api/content/123/child/attachment/456/data
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/attachment/5678/data
   *
   *                              Responses
   */
  async updateData<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Update the binary data of an Attachment, and optionally the comment and the minor edit field. This adds a new
   * version of the attachment, containing the new binary data, filename, and content-type.
   *
   *                                  When updating the binary data of an attachment, the comment related to it together with the field that
   *                              specifies if it's a minor edit can be updated as well, but are not required.
   *                              If an update is considered to be a minor edit, notifications will not be sent to the watchers of that content.
   *
   *                              This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
   *                              libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP Components
   *                              library provides a
   *                              MultiPartEntity
   *                              that makes it simple to submit a multipart POST.
   *
   *
   *                              In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection
   *                              on it.  This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be
   *                              blocked.
   *
   *
   *                              The name of the multipart/form-data parameter that contains attachments must be "file"
   *
   *
   *                              A simple example to upload a file called "myfile.txt" to the Attachment with id "456" in a container with id "123", with the
   *                              comment updated, and minorEdit set to true:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" -F "minorEdit=true" -F "comment=This
   *                              is my updated File" http://myhost/rest/api/content/123/child/attachment/456/data
   *
   *                              An example to upload the same file, with no comment:
   *                              curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" http://myhost/rest/api/content/123/child/attachment/456/data
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/child/attachment/5678/data
   *
   *                              Responses
   */
  async updateData<T = unknown>(callback?: never): Promise<T>;
  async updateData<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/child/attachment/${parameters.attachmentId}/data`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'updateData' });
  }

  /**
   * Returns a map of the descendants of a piece of Content. Content can have multiple types of descendants - for
   * example a Page can have descendants that are also Pages, but it can also have Comments and Attachments.
   *
   *                                  The {@link ContentType}(s) of the descendants returned is specified by the "expand" query parameter in the request
   *                              - this parameter can include expands for multiple descendant types.
   *
   *                              If no types are included in the expand parameter, the map returned will just list the descendant types that are available
   *                              to be expanded for the {@link Content} referenced by the "id" path parameter.
   *
   *
   *                              Currently the only supported descendants are comment descendants of non-comment Content.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/descendant
   *                              http://example.com/rest/api/content/1234/descendant?expand=comment.body.VIEW
   *                              http://example.com/rest/api/content/1234/descendant?expand=comment
   */
  async descendants<T = unknown>(parameters: Parameters.Descendants | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a map of the descendants of a piece of Content. Content can have multiple types of descendants - for
   * example a Page can have descendants that are also Pages, but it can also have Comments and Attachments.
   *
   *                                  The {@link ContentType}(s) of the descendants returned is specified by the "expand" query parameter in the request
   *                              - this parameter can include expands for multiple descendant types.
   *
   *                              If no types are included in the expand parameter, the map returned will just list the descendant types that are available
   *                              to be expanded for the {@link Content} referenced by the "id" path parameter.
   *
   *
   *                              Currently the only supported descendants are comment descendants of non-comment Content.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/descendant
   *                              http://example.com/rest/api/content/1234/descendant?expand=comment.body.VIEW
   *                              http://example.com/rest/api/content/1234/descendant?expand=comment
   */
  async descendants<T = unknown>(parameters?: Parameters.Descendants, callback?: never): Promise<T>;
  async descendants<T = unknown>(parameters?: Parameters.Descendants, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/descendant`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'descendants' });
  }

  /**
   * Returns the direct descendants of a piece of Content, limited to a single descendant type.
   *
   *                                  The {@link ContentType}(s) of the descendants returned is specified by the "type" path parameter in the request.
   *
   *
   *                              Currently the only supported descendants are comment descendants of non-comment Content.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/descendant/comment
   *                              http://example.com/rest/api/content/1234/descendant/comment?expand=body.VIEW
   *                              http://example.com/rest/api/content/1234/descendant/comment?start=20&limit=10
   */
  async descendantsOfType<T = unknown>(
    parameters: Parameters.DescendantsOfType | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the direct descendants of a piece of Content, limited to a single descendant type.
   *
   *                                  The {@link ContentType}(s) of the descendants returned is specified by the "type" path parameter in the request.
   *
   *
   *                              Currently the only supported descendants are comment descendants of non-comment Content.
   *
   *
   *                              Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/descendant/comment
   *                              http://example.com/rest/api/content/1234/descendant/comment?expand=body.VIEW
   *                              http://example.com/rest/api/content/1234/descendant/comment?start=20&limit=10
   */
  async descendantsOfType<T = unknown>(parameters?: Parameters.DescendantsOfType, callback?: never): Promise<T>;
  async descendantsOfType<T = unknown>(
    parameters?: Parameters.DescendantsOfType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/descendant/${parameters.type}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'descendantsOfType' });
  }

  /**
   * Returns the list of labels on a piece of Content.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/label
   *                              http://example.com/rest/api/content/1234/label?prefix=global&start=0&limit=200
   */
  async labels<T = unknown>(parameters: Parameters.Labels | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns the list of labels on a piece of Content.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/content/1234/label
   *                              http://example.com/rest/api/content/1234/label?prefix=global&start=0&limit=200
   */
  async labels<T = unknown>(parameters?: Parameters.Labels, callback?: never): Promise<T>;
  async labels<T = unknown>(parameters?: Parameters.Labels, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/label`,
      method: 'GET',
      params: {
        prefix: parameters?.prefix,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'labels' });
  }

  /** Adds a list of labels to the specified content. The body is the json representation of the list. */
  async addLabels<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Adds a list of labels to the specified content. The body is the json representation of the list. */
  async addLabels<T = unknown>(callback?: never): Promise<T>;
  async addLabels<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/label`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'addLabels' });
  }

  /** Deletes a labels to the specified content. */
  async deleteLabelWithQueryParam<T = unknown>(
    parameters: Parameters.DeleteLabelWithQueryParam | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Deletes a labels to the specified content. */
  async deleteLabelWithQueryParam<T = unknown>(
    parameters?: Parameters.DeleteLabelWithQueryParam,
    callback?: never
  ): Promise<T>;
  async deleteLabelWithQueryParam<T = unknown>(
    parameters?: Parameters.DeleteLabelWithQueryParam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/label`,
      method: 'DELETE',
      params: {
        name: parameters?.name,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'deleteLabelWithQueryParam' });
  }

  /**
   * Deletes a labels to the specified content. When calling this method through REST the label parameter doesn't accept
   * "/" characters in label names, because of security constraints. For this case please use the query parameter
   * version of this method (/content/{id}/label?name={label}Responses
   */
  async deleteLabel<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Deletes a labels to the specified content. When calling this method through REST the label parameter doesn't accept
   * "/" characters in label names, because of security constraints. For this case please use the query parameter
   * version of this method (/content/{id}/label?name={label}Responses
   */
  async deleteLabel<T = unknown>(callback?: never): Promise<T>;
  async deleteLabel<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/label/${parameters.label}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'deleteLabel' });
  }

  /**
   * Returns a paginated list of content properties.
   *
   *                                  Example request URI:
   *
   *                              http://example.com/rest/api/content/1234/property?expand=content,version
   */
  async findAll<T = unknown>(parameters: Parameters.FindAll | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a paginated list of content properties.
   *
   *                                  Example request URI:
   *
   *                              http://example.com/rest/api/content/1234/property?expand=content,version
   */
  async findAll<T = unknown>(parameters?: Parameters.FindAll, callback?: never): Promise<T>;
  async findAll<T = unknown>(parameters?: Parameters.FindAll, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'findAll' });
  }

  /** Creates a new content property. */
  async create<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Creates a new content property. */
  async create<T = unknown>(callback?: never): Promise<T>;
  async create<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'create' });
  }

  /**
   * Returns a content property.
   *
   *                                  Example request URI:
   *
   *                              http://example.com/rest/api/content/1234/property/example-property-key?expand=content,version
   */
  async findByKey<T = unknown>(parameters: Parameters.FindByKey | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a content property.
   *
   *                                  Example request URI:
   *
   *                              http://example.com/rest/api/content/1234/property/example-property-key?expand=content,version
   */
  async findByKey<T = unknown>(parameters?: Parameters.FindByKey, callback?: never): Promise<T>;
  async findByKey<T = unknown>(parameters?: Parameters.FindByKey, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property/${parameters.key}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'findByKey' });
  }

  /** Creates a new content property. */
  async create<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Creates a new content property. */
  async create<T = unknown>(callback?: never): Promise<T>;
  async create<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property/${parameters.key}`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'create' });
  }

  /**
   * Updates a content property. The body contains the representation of the content property. Must include the property
   * id, and the new version number. Attempts to create a new content property if the given version number is 1, just
   * like
   * {@link #create(com.atlassian.confluence.api.model.content.id.ContentId,
   * String, com.atlassian.confluence.api.model.content.JsonContentProperty)}.
   */
  async update<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Updates a content property. The body contains the representation of the content property. Must include the property
   * id, and the new version number. Attempts to create a new content property if the given version number is 1, just
   * like
   * {@link #create(com.atlassian.confluence.api.model.content.id.ContentId,
   * String, com.atlassian.confluence.api.model.content.JsonContentProperty)}.
   */
  async update<T = unknown>(callback?: never): Promise<T>;
  async update<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property/${parameters.key}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'update' });
  }

  /** Deletes a content property.Responses */
  async delete<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Deletes a content property.Responses */
  async delete<T = unknown>(callback?: never): Promise<T>;
  async delete<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/property/${parameters.key}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'delete' });
  }

  /** Returns info about all restrictions by operation */
  async byOperation<T = unknown>(parameters: Parameters.ByOperation | undefined, callback: Callback<T>): Promise<void>;
  /** Returns info about all restrictions by operation */
  async byOperation<T = unknown>(parameters?: Parameters.ByOperation, callback?: never): Promise<T>;
  async byOperation<T = unknown>(parameters?: Parameters.ByOperation, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/restriction/byOperation`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'byOperation' });
  }

  /** Returns info about all restrictions of given operation */
  async forOperation<T = unknown>(
    parameters: Parameters.ForOperation | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns info about all restrictions of given operation */
  async forOperation<T = unknown>(parameters?: Parameters.ForOperation, callback?: never): Promise<T>;
  async forOperation<T = unknown>(parameters?: Parameters.ForOperation, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'forOperation' });
  }

  /** Publishes a legacy draft of a Content created from a ContentBlueprint */
  async publishLegacyDraft<T = unknown>(
    parameters: Parameters.PublishLegacyDraft | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Publishes a legacy draft of a Content created from a ContentBlueprint */
  async publishLegacyDraft<T = unknown>(parameters?: Parameters.PublishLegacyDraft, callback?: never): Promise<T>;
  async publishLegacyDraft<T = unknown>(
    parameters?: Parameters.PublishLegacyDraft,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/blueprint/instance/${parameters.draftId}`,
      method: 'POST',
      params: {
        status: parameters?.status,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'publishLegacyDraft' });
  }

  /** Publishes a shared draft of a Content created from a ContentBlueprint */
  async publishSharedDraft<T = unknown>(
    parameters: Parameters.PublishSharedDraft | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Publishes a shared draft of a Content created from a ContentBlueprint */
  async publishSharedDraft<T = unknown>(parameters?: Parameters.PublishSharedDraft, callback?: never): Promise<T>;
  async publishSharedDraft<T = unknown>(
    parameters?: Parameters.PublishSharedDraft,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/content/blueprint/instance/${parameters.draftId}`,
      method: 'PUT',
      params: {
        status: parameters?.status,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'publishSharedDraft' });
  }
}
