import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class BlogPost {
  constructor(private client: Client) {}

  /**
   * Returns all blog posts. The number of results is limited by the `limit` parameter and additional results (if
   * available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only blog posts that the user has permission to view will be returned.
   */
  async getBlogPosts<T = Models.GetBlogPosts>(
    parameters: Parameters.GetBlogPosts | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all blog posts. The number of results is limited by the `limit` parameter and additional results (if
   * available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only blog posts that the user has permission to view will be returned.
   */
  async getBlogPosts<T = Models.GetBlogPosts>(parameters?: Parameters.GetBlogPosts, callback?: never): Promise<T>;
  async getBlogPosts<T = Models.GetBlogPosts>(
    parameters?: Parameters.GetBlogPosts,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/blogposts',
      method: 'GET',
      params: {
        cursor: parameters?.cursor,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new blog post in the space specified by the spaceId.
   *
   * By default this will create the blog post as a non-draft, unless the status is specified as draft. If creating a
   * non-draft, the title must not be empty.
   *
   * Currently only supports the storage representation specified in the body.representation enums below
   */
  async createBlogPost<T = Models.BlogPost>(callback: Callback<T>): Promise<void>;
  /**
   * Creates a new blog post in the space specified by the spaceId.
   *
   * By default this will create the blog post as a non-draft, unless the status is specified as draft. If creating a
   * non-draft, the title must not be empty.
   *
   * Currently only supports the storage representation specified in the body.representation enums below
   */
  async createBlogPost<T = Models.BlogPost>(callback?: never): Promise<T>;
  async createBlogPost<T = Models.BlogPost>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/blogposts',
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a specific blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
   * corresponding space.
   */
  async getBlogPostById<T = Models.BlogPost>(
    parameters: Parameters.GetBlogPostById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a specific blog post.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
   * corresponding space.
   */
  async getBlogPostById<T = Models.BlogPost>(parameters: Parameters.GetBlogPostById, callback?: never): Promise<T>;
  async getBlogPostById<T = Models.BlogPost>(
    parameters: Parameters.GetBlogPostById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        'get-draft': parameters['get-draft'],
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a blog post by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
   * corresponding space. Permission to update blog posts in the space.
   */
  async updateBlogPost<T = Models.BlogPost>(
    parameters: Parameters.UpdateBlogPost,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Update a blog post by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
   * corresponding space. Permission to update blog posts in the space.
   */
  async updateBlogPost<T = Models.BlogPost>(parameters: Parameters.UpdateBlogPost, callback?: never): Promise<T>;
  async updateBlogPost<T = Models.BlogPost>(
    parameters: Parameters.UpdateBlogPost,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete a blog post by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
   * corresponding space. Permission to delete blog posts in the space.
   */
  async deleteBlogPost<T = void>(parameters: Parameters.DeleteBlogPost, callback: Callback<T>): Promise<void>;
  /**
   * Delete a blog post by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the blog post and its
   * corresponding space. Permission to delete blog posts in the space.
   */
  async deleteBlogPost<T = void>(parameters: Parameters.DeleteBlogPost, callback?: never): Promise<T>;
  async deleteBlogPost<T = void>(parameters: Parameters.DeleteBlogPost, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/blogposts/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the blogposts of specified label. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getLabelBlogPosts<T = Models.GetLabelBlogPosts>(
    parameters: Parameters.GetLabelBlogPosts,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the blogposts of specified label. The number of results is limited by the `limit` parameter and additional
   * results (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content of the page
   * and its corresponding space.
   */
  async getLabelBlogPosts<T = Models.GetLabelBlogPosts>(
    parameters: Parameters.GetLabelBlogPosts,
    callback?: never
  ): Promise<T>;
  async getLabelBlogPosts<T = Models.GetLabelBlogPosts>(
    parameters: Parameters.GetLabelBlogPosts,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/labels/${parameters.id}/blogposts`,
      method: 'GET',
      params: {
        sort: parameters.sort,
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all blog posts in a space. The number of results is limited by the `limit` parameter and additional results
   * (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and view the space. Only blog posts that the user has permission to view will be
   * returned.
   */
  async getBlogPostsInSpace<T = Models.GetBlogPostsInSpace>(
    parameters: Parameters.GetBlogPostsInSpace,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all blog posts in a space. The number of results is limited by the `limit` parameter and additional results
   * (if available) will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission) and view the space. Only blog posts that the user has permission to view will be
   * returned.
   */
  async getBlogPostsInSpace<T = Models.GetBlogPostsInSpace>(
    parameters: Parameters.GetBlogPostsInSpace,
    callback?: never
  ): Promise<T>;
  async getBlogPostsInSpace<T = Models.GetBlogPostsInSpace>(
    parameters: Parameters.GetBlogPostsInSpace,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/spaces/${parameters.id}/blogposts`,
      method: 'GET',
      params: {
        cursor: parameters.cursor,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
