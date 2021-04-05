export interface SearchContentByCQL {
  /** The CQL string that is used to find the requested content. */
  cql: string;
  /** The space, content, and content status to execute the search against.
    Specify this as an object with the following properties:

    - `spaceKey` Key of the space to search against. Optional.
    - `contentId` ID of the content to search against. Optional. Must
    be in the space spacified by `spaceKey`.
    - `contentStatuses` Content statuses to search against. Optional. */
  cqlcontext?: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
  /** Pointer to a set of search results, returned as part of the `next` or `prev` URL from the previous search call. */
  cursor?: string;
  /** The maximum number of content objects to return per page.
    Note, this may be restricted by fixed system limits. */
  limit?: number;
}
