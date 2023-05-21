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
}
