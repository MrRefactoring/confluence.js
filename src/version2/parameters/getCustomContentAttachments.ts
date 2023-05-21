export interface GetCustomContentAttachments {
  /** The ID of the custom content for which attachments should be returned. */
  id: number;
  /** Used to sort the result by a particular field. */
  sort?: {};
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /** Filters on the mediaType of attachments. Only one may be specified. */
  mediaType?: string;
  /** Filters on the file-name of attachments. Only one may be specified. */
  filename?: string;
  /**
   * Maximum number of attachments per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit?: number;
}
