export interface GetPageVersions {
  /**
   * The ID of the page to be queried for its versions. If you don't know the page ID, use Get pages and filter the
   * results.
   */
  id: number;
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /**
   * Maximum number of versions per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit?: number;
  /** Used to sort the result by a particular field. */
  sort?: {};
}
