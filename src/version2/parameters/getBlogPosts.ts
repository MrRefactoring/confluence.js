export interface GetBlogPosts {
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /**
   * Maximum number of blog posts per result to return. If more results exist, use the `Link` response header to
   * retrieve a relative URL that will return the next set of results.
   */
  limit?: number;
}
