import { PrimaryBodyRepresentation } from '../models';

export interface GetBlogPostsInSpace {
  /** The ID of the space for which blog posts should be returned. */
  id: number;
  /** Filter the results to blog posts based on their status. */
  status?: string;
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat?: PrimaryBodyRepresentation;
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /**
   * Maximum number of blog posts per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
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
