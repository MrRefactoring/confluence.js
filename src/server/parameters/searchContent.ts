export interface SearchContent {
  /** The CQL query see advanced searching in confluence using CQL */
  cql?: string;
  /**
   * The execution context for CQL functions, provides current space key and content id. If this is not provided some
   * CQL functions will not be available.
   */
  cqlcontext?: string;
  /** The excerpt strategy to apply to the result, one of : indexed, highlight, none. This defaults to highlight. */
  excerpt?: string;
  /** The properties to expand on the search result, this may cause database requests for some properties */
  expand?: string;
  /** The start point of the collection to return */
  start?: number;
  /** The limit of the number of items to return, this may be restricted by fixed system limits */
  limit?: number;
  /** Whether to include content in archived spaces in the result, this defaults to false */
  includeArchivedSpaces?: boolean;
}
