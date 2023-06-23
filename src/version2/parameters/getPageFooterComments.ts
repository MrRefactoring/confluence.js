export interface GetPageFooterComments {
  /** The ID of the page for which footer comments should be returned. */
  id: number;
  /**
   * The content format type to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  'body-format'?: {};
  /** Used to sort the result by a particular field. */
  sort?: 'created-date' | '-created-date' | 'modified-date' | '-modified-date';
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /**
   * Maximum number of footer comments per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit?: number;
}
