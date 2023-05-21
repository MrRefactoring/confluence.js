import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Comment {
  constructor(private client: Client) {}

  /**
   * Returns the root footer comments of specific page. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getPageFooterComments<T = Models.Pagination<Models.PageComment>>(
    parameters: Parameters.GetPageFooterComments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the root footer comments of specific page. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getPageFooterComments<T = Models.Pagination<Models.PageComment>>(
    parameters: Parameters.GetPageFooterComments,
    callback?: never,
  ): Promise<T>;
  async getPageFooterComments<T = Models.Pagination<Models.PageComment>>(
    parameters: Parameters.GetPageFooterComments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/footer-comments`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the root inline comments of specific page. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getPageInlineComments<T = Models.Pagination<Models.PageInlineComment>>(
    parameters: Parameters.GetPageInlineComments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the root inline comments of specific page. The number of results is limited by the `limit` parameter and
   * additional results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getPageInlineComments<T = Models.Pagination<Models.PageInlineComment>>(
    parameters: Parameters.GetPageInlineComments,
    callback?: never,
  ): Promise<T>;
  async getPageInlineComments<T = Models.Pagination<Models.PageInlineComment>>(
    parameters: Parameters.GetPageInlineComments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/inline-comments`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the root footer comments of specific blog post. The number of results is limited by the `limit` parameter
   * and additional results (if available) will be available through the `next` URL present in the `Link` response
   * header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
   * post and its corresponding space.
   */
  async getBlogPostFooterComments<T = Models.Pagination<Models.BlogPostComment>>(
    parameters: Parameters.GetBlogPostFooterComments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the root footer comments of specific blog post. The number of results is limited by the `limit` parameter
   * and additional results (if available) will be available through the `next` URL present in the `Link` response
   * header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
   * post and its corresponding space.
   */
  async getBlogPostFooterComments<T = Models.Pagination<Models.BlogPostComment>>(
    parameters: Parameters.GetBlogPostFooterComments,
    callback?: never,
  ): Promise<T>;
  async getBlogPostFooterComments<T = Models.Pagination<Models.BlogPostComment>>(
    parameters: Parameters.GetBlogPostFooterComments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}/footer-comments`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the root inline comments of specific blog post. The number of results is limited by the `limit` parameter
   * and additional results (if available) will be available through the `next` URL present in the `Link` response
   * header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
   * post and its corresponding space.
   */
  async getBlogPostInlineComments<T = Models.Pagination<Models.BlogPostInlineComment>>(
    parameters: Parameters.GetBlogPostInlineComments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the root inline comments of specific blog post. The number of results is limited by the `limit` parameter
   * and additional results (if available) will be available through the `next` URL present in the `Link` response
   * header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the blog
   * post and its corresponding space.
   */
  async getBlogPostInlineComments<T = Models.Pagination<Models.BlogPostInlineComment>>(
    parameters: Parameters.GetBlogPostInlineComments,
    callback?: never,
  ): Promise<T>;
  async getBlogPostInlineComments<T = Models.Pagination<Models.BlogPostInlineComment>>(
    parameters: Parameters.GetBlogPostInlineComments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}/inline-comments`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Create a footer comment. This can be at the top level (specifying pageId or blogPostId in the request body) or as a
   * reply (specifying parentCommentId in the request body).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create comments in the space.
   */
  async createFooterComment<T = Models.FooterCommentModel>(
    parameters: Parameters.CreateFooterComment | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Create a footer comment. This can be at the top level (specifying pageId or blogPostId in the request body) or as a
   * reply (specifying parentCommentId in the request body).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create comments in the space.
   */
  async createFooterComment<T = Models.FooterCommentModel>(
    parameters?: Parameters.CreateFooterComment,
    callback?: never,
  ): Promise<T>;
  async createFooterComment<T = Models.FooterCommentModel>(
    parameters?: Parameters.CreateFooterComment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/footer-comments',
      method: 'POST',
      params: {
        'serialize-ids-as-strings': parameters?.serializeIdsAsStrings,
      },
      data: {
        blogPostId: parameters?.blogPostId,
        pageId: parameters?.pageId,
        parentCommentId: parameters?.parentCommentId,
        body: parameters?.body,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves a footer comment by id
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space.
   */
  async getFooterCommentById<T = Models.FooterCommentModel>(
    parameters: Parameters.GetFooterCommentById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves a footer comment by id
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space.
   */
  async getFooterCommentById<T = Models.FooterCommentModel>(
    parameters: Parameters.GetFooterCommentById,
    callback?: never,
  ): Promise<T>;
  async getFooterCommentById<T = Models.FooterCommentModel>(
    parameters: Parameters.GetFooterCommentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/footer-comments/${parameters.commentId}`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        version: parameters.version,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a footer comment. This can be used to update the body text of a comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create comments in the space.
   */
  async updateFooterComment<T = Models.FooterCommentModel>(
    parameters: Parameters.UpdateFooterComment,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update a footer comment. This can be used to update the body text of a comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create comments in the space.
   */
  async updateFooterComment<T = Models.FooterCommentModel>(
    parameters: Parameters.UpdateFooterComment,
    callback?: never,
  ): Promise<T>;
  async updateFooterComment<T = Models.FooterCommentModel>(
    parameters: Parameters.UpdateFooterComment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/footer-comments/${parameters.commentId}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
      data: {
        version: parameters.version,
        body: parameters.body,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a footer comment. This is a permanent deletion and cannot be reverted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to delete comments in the space.
   */
  async deleteFooterComment<T = void>(parameters: Parameters.DeleteFooterComment, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a footer comment. This is a permanent deletion and cannot be reverted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to delete comments in the space.
   */
  async deleteFooterComment<T = void>(parameters: Parameters.DeleteFooterComment, callback?: never): Promise<T>;
  async deleteFooterComment<T = void>(
    parameters: Parameters.DeleteFooterComment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/footer-comments/${parameters.commentId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the children footer comments of specific comment. The number of results is limited by the `limit` parameter
   * and additional results (if available) will be available through the `next` URL present in the `Link` response
   * header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getFooterCommentChildren<T = Models.Pagination<Models.ChildrenComment>>(
    parameters: Parameters.GetFooterCommentChildren,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the children footer comments of specific comment. The number of results is limited by the `limit` parameter
   * and additional results (if available) will be available through the `next` URL present in the `Link` response
   * header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getFooterCommentChildren<T = Models.Pagination<Models.ChildrenComment>>(
    parameters: Parameters.GetFooterCommentChildren,
    callback?: never,
  ): Promise<T>;
  async getFooterCommentChildren<T = Models.Pagination<Models.ChildrenComment>>(
    parameters: Parameters.GetFooterCommentChildren,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/footer-comments/${parameters.id}/children`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Create an inline comment. This can be at the top level (specifying pageId or blogPostId in the request body) or as
   * a reply (specifying parentCommentId in the request body). Note the inlineCommentProperties object in the request
   * body is used to select the text the inline comment should be tied to. This is what determines the text highlighting
   * when viewing a page in Confluence.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create comments in the space.
   */
  async createInlineComment<T = Models.InlineCommentModel>(
    parameters: Parameters.CreateInlineComment | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Create an inline comment. This can be at the top level (specifying pageId or blogPostId in the request body) or as
   * a reply (specifying parentCommentId in the request body). Note the inlineCommentProperties object in the request
   * body is used to select the text the inline comment should be tied to. This is what determines the text highlighting
   * when viewing a page in Confluence.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create comments in the space.
   */
  async createInlineComment<T = Models.InlineCommentModel>(
    parameters?: Parameters.CreateInlineComment,
    callback?: never,
  ): Promise<T>;
  async createInlineComment<T = Models.InlineCommentModel>(
    parameters?: Parameters.CreateInlineComment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/inline-comments',
      method: 'POST',
      params: {
        'serialize-ids-as-strings': parameters?.serializeIdsAsStrings,
      },
      data: {
        blogPostId: parameters?.blogPostId,
        pageId: parameters?.pageId,
        parentCommentId: parameters?.parentCommentId,
        body: parameters?.body,
        inlineCommentProperties: parameters?.inlineCommentProperties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves an inline comment by id
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space.
   */
  async getInlineCommentById<T = Models.InlineCommentModel>(
    parameters: Parameters.GetInlineCommentById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves an inline comment by id
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space.
   */
  async getInlineCommentById<T = Models.InlineCommentModel>(
    parameters: Parameters.GetInlineCommentById,
    callback?: never,
  ): Promise<T>;
  async getInlineCommentById<T = Models.InlineCommentModel>(
    parameters: Parameters.GetInlineCommentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/inline-comments/${parameters.commentId}`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        version: parameters.version,
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update an inline comment. This can be used to update the body text of a comment and/or to resolve the comment
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create comments in the space.
   */
  async updateInlineComment<T = Models.InlineCommentModel>(
    parameters: Parameters.UpdateInlineComment,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update an inline comment. This can be used to update the body text of a comment and/or to resolve the comment
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to create comments in the space.
   */
  async updateInlineComment<T = Models.InlineCommentModel>(
    parameters: Parameters.UpdateInlineComment,
    callback?: never,
  ): Promise<T>;
  async updateInlineComment<T = Models.InlineCommentModel>(
    parameters: Parameters.UpdateInlineComment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/inline-comments/${parameters.commentId}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
      },
      data: {
        version: parameters.version,
        body: parameters.body,
        resolved: parameters.resolved,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an inline comment. This is a permanent deletion and cannot be reverted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to delete comments in the space.
   */
  async deleteInlineComment<T = void>(parameters: Parameters.DeleteInlineComment, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an inline comment. This is a permanent deletion and cannot be reverted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blogpost and its corresponding space. Permission to delete comments in the space.
   */
  async deleteInlineComment<T = void>(parameters: Parameters.DeleteInlineComment, callback?: never): Promise<T>;
  async deleteInlineComment<T = void>(
    parameters: Parameters.DeleteInlineComment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/inline-comments/${parameters.commentId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the children inline comments of specific comment. The number of results is limited by the `limit` parameter
   * and additional results (if available) will be available through the `next` URL present in the `Link` response
   * header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getInlineCommentChildren<T = Models.Pagination<Models.InlineCommentChildren>>(
    parameters: Parameters.GetInlineCommentChildren,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the children inline comments of specific comment. The number of results is limited by the `limit` parameter
   * and additional results (if available) will be available through the `next` URL present in the `Link` response
   * header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getInlineCommentChildren<T = Models.Pagination<Models.InlineCommentChildren>>(
    parameters: Parameters.GetInlineCommentChildren,
    callback?: never,
  ): Promise<T>;
  async getInlineCommentChildren<T = Models.Pagination<Models.InlineCommentChildren>>(
    parameters: Parameters.GetInlineCommentChildren,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/inline-comments/${parameters.id}/children`,
      method: 'GET',
      params: {
        'serialize-ids-as-strings': parameters.serializeIdsAsStrings,
        'body-format': parameters['body-format'],
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
