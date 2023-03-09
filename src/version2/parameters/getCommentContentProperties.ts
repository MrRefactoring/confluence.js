export interface GetCommentContentProperties {
  /** The ID of the comment for which content properties should be returned. */
  'comment-id': number;
  /** Filters the response to return a specific content property with matching key (case sensitive). */
  key?: string;
  /** Used to sort the result by a particular field. */
  sort?: {};
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /**
   * Maximum number of attachments per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit?: number;
}
