export interface GetCustomContentLabels {
  /** The ID of the custom content for which labels should be returned. */
  id: number;
  /** Filter the results to labels based on their prefix. */
  prefix?: string;
  /** Used to sort the result by a particular field. */
  sort?: string;
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /**
   * Maximum number of labels per result to return. If more results exist, use the `Link` header to retrieve a relative
   * URL that will return the next set of results.
   */
  limit?: number;
  /**
   * Due to JavaScript's max integer representation of 2^53-1, the type of any IDs returned in the response body for
   * this endpoint will be changed from a numeric type to a string type at the end of the deprecation period. In the
   * meantime, this query param can be passed to this endpoint to opt-in to this change now. See this
   * [changelog](https://developer.atlassian.com/cloud/confluence/changelog/#CHANGE-905) for more detail.
   */
  serializeIdsAsStrings?: boolean;
}
