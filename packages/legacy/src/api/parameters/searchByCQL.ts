export interface SearchByCQL {
  /**
   * The CQL query to be used for the search. See [Advanced Searching using
   * CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/) for instructions on how to
   * build a CQL query.
   */
  cql: string;
  /**
   * The space, content, and content status to execute the search against.
   *
   * - `spaceKey` Key of the space to search against. Optional.
   * - `contentId` ID of the content to search against. Optional. Must be in the space specified by `spaceKey`.
   * - `contentStatuses` Content statuses to search against. Optional.
   *
   * Specify these values in an object. For example, `cqlcontext={%22spaceKey%22:%22TEST%22, %22contentId%22:%22123%22}`
   */
  cqlcontext?: string;
  /** Pointer to a set of search results, returned as part of the `next` or `prev` URL from the previous search call. */
  cursor?: string;
  next?: boolean;
  prev?: boolean;
  /** The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
  /** The start point of the collection to return */
  start?: number;
  /** Whether to include content from archived spaces in the results. */
  includeArchivedSpaces?: boolean;
  /** Whether to exclude current spaces and only show archived spaces. */
  excludeCurrentSpaces?: boolean;
  /** The excerpt strategy to apply to the result */
  excerpt?: string;
  sitePermissionTypeFilter?: string;
  expand?: string[];
}
