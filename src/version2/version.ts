import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Version {
  constructor(private client: Client) {}

  /**
   * Returns the versions of specific attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment and its
   * corresponding space.
   */
  async getAttachmentVersions<T = Models.Pagination<Models.AttachmentVersion>>(
    parameters: Parameters.GetAttachmentVersions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the versions of specific attachment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment and its
   * corresponding space.
   */
  async getAttachmentVersions<T = Models.Pagination<Models.AttachmentVersion>>(
    parameters: Parameters.GetAttachmentVersions,
    callback?: never,
  ): Promise<T>;
  async getAttachmentVersions<T = Models.Pagination<Models.AttachmentVersion>>(
    parameters: Parameters.GetAttachmentVersions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.id}/versions`,
      method: 'GET',
      params: {
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves version details for the specified attachment and version number.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
   */
  async getAttachmentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetAttachmentVersionDetails,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves version details for the specified attachment and version number.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the attachment.
   */
  async getAttachmentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetAttachmentVersionDetails,
    callback?: never,
  ): Promise<T>;
  async getAttachmentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetAttachmentVersionDetails,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/attachments/${parameters.attachmentId}/versions/${parameters.versionNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the versions of specific blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
   * corresponding space.
   */
  async getBlogPostVersions<T = Models.Pagination<Models.BlogPostVersion>>(
    parameters: Parameters.GetBlogPostVersions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the versions of specific blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
   * corresponding space.
   */
  async getBlogPostVersions<T = Models.Pagination<Models.BlogPostVersion>>(
    parameters: Parameters.GetBlogPostVersions,
    callback?: never,
  ): Promise<T>;
  async getBlogPostVersions<T = Models.Pagination<Models.BlogPostVersion>>(
    parameters: Parameters.GetBlogPostVersions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}/versions`,
      method: 'GET',
      params: {
        'body-format': parameters.bodyFormat,
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves version details for the specified blog post and version number.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogPostVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetBlogPostVersionDetails,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves version details for the specified blog post and version number.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post.
   */
  async getBlogPostVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetBlogPostVersionDetails,
    callback?: never,
  ): Promise<T>;
  async getBlogPostVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetBlogPostVersionDetails,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.blogpostId}/versions/${parameters.versionNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the versions of specific page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
   * corresponding space.
   */
  async getPageVersions<T = Models.Pagination<Models.PageVersion>>(
    parameters: Parameters.GetPageVersions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the versions of specific page.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page and its
   * corresponding space.
   */
  async getPageVersions<T = Models.Pagination<Models.PageVersion>>(
    parameters: Parameters.GetPageVersions,
    callback?: never,
  ): Promise<T>;
  async getPageVersions<T = Models.Pagination<Models.PageVersion>>(
    parameters: Parameters.GetPageVersions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.id}/versions`,
      method: 'GET',
      params: {
        'body-format': parameters.bodyFormat,
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves version details for the specified page and version number.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetPageVersionDetails,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves version details for the specified page and version number.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getPageVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetPageVersionDetails,
    callback?: never,
  ): Promise<T>;
  async getPageVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetPageVersionDetails,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/pages/${parameters.pageId}/versions/${parameters.versionNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the versions of specific custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and
   * its corresponding page and space.
   */
  async getCustomContentVersions<T = Models.Pagination<Models.CustomContentVersion>>(
    parameters: Parameters.GetCustomContentVersions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the versions of specific custom content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the custom content and
   * its corresponding page and space.
   */
  async getCustomContentVersions<T = Models.Pagination<Models.CustomContentVersion>>(
    parameters: Parameters.GetCustomContentVersions,
    callback?: never,
  ): Promise<T>;
  async getCustomContentVersions<T = Models.Pagination<Models.CustomContentVersion>>(
    parameters: Parameters.GetCustomContentVersions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.customContentId}/versions`,
      method: 'GET',
      params: {
        'body-format': parameters.bodyFormat,
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves version details for the specified custom content and version number.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getCustomContentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetCustomContentVersionDetails,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves version details for the specified custom content and version number.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the page.
   */
  async getCustomContentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetCustomContentVersionDetails,
    callback?: never,
  ): Promise<T>;
  async getCustomContentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetCustomContentVersionDetails,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/custom-content/${parameters.customContentId}/versions/${parameters.versionNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves the versions of the specified footer comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blog post and its corresponding space.
   */
  async getFooterCommentVersions<T = Models.Pagination<Models.CommentVersion>>(
    parameters: Parameters.GetFooterCommentVersions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves the versions of the specified footer comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blog post and its corresponding space.
   */
  async getFooterCommentVersions<T = Models.Pagination<Models.CommentVersion>>(
    parameters: Parameters.GetFooterCommentVersions,
    callback?: never,
  ): Promise<T>;
  async getFooterCommentVersions<T = Models.Pagination<Models.CommentVersion>>(
    parameters: Parameters.GetFooterCommentVersions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/footer-comments/${parameters.id}/versions`,
      method: 'GET',
      params: {
        'body-format': parameters.bodyFormat,
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves version details for the specified footer comment version.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blog post and its corresponding space.
   */
  async getFooterCommentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetFooterCommentVersionDetails,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves version details for the specified footer comment version.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blog post and its corresponding space.
   */
  async getFooterCommentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetFooterCommentVersionDetails,
    callback?: never,
  ): Promise<T>;
  async getFooterCommentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetFooterCommentVersionDetails,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/footer-comments/${parameters.id}/versions/${parameters.versionNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves the versions of the specified inline comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blog post and its corresponding space.
   */
  async getInlineCommentVersions<T = Models.Pagination<Models.CommentVersion>>(
    parameters: Parameters.GetInlineCommentVersions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves the versions of the specified inline comment.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blog post and its corresponding space.
   */
  async getInlineCommentVersions<T = Models.Pagination<Models.CommentVersion>>(
    parameters: Parameters.GetInlineCommentVersions,
    callback?: never,
  ): Promise<T>;
  async getInlineCommentVersions<T = Models.Pagination<Models.CommentVersion>>(
    parameters: Parameters.GetInlineCommentVersions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/inline-comments/${parameters.id}/versions`,
      method: 'GET',
      params: {
        'body-format': parameters.bodyFormat,
        cursor: parameters.cursor,
        limit: parameters.limit,
        sort: parameters.sort,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves version details for the specified inline comment version.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blog post and its corresponding space.
   */
  async getInlineCommentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetInlineCommentVersionDetails,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves version details for the specified inline comment version.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * or blog post and its corresponding space.
   */
  async getInlineCommentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetInlineCommentVersionDetails,
    callback?: never,
  ): Promise<T>;
  async getInlineCommentVersionDetails<T = Models.DetailedVersion>(
    parameters: Parameters.GetInlineCommentVersionDetails,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/inline-comments/${parameters.id}/versions/${parameters.versionNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
