import { PrimaryBodyRepresentation } from '../models';

export interface GetLabelBlogPosts {
  /** The ID of the label for which blog posts should be returned. */
  id: number;
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat?: PrimaryBodyRepresentation;
  /** Used to sort the result by a particular field. */
  sort?: 'id' | '-id' | 'created-date' | '-created-date' | 'modified-date' | '-modified-date' | string;
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
}
