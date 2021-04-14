export interface GetContentComments {
  /** The ID of the content to be queried for its comments. */
  id: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
  /** The version of the parent content to retrieve children for.
   Currently, this only works for the latest version. */
  parentVersion?: number;
  /** The starting index of the returned comments. */
  start?: number;
  /** The maximum number of comments to return per page. Note,
   this may be restricted by fixed system limits. */
  limit?: number;
  /** The location of the comments in the page. Multiple locations can be specified.
   If no location is specified, comments from all locations are returned. */
  location?: string[];
  /** Currently, this parameter is not used.
   Comments are returned at the root level only. */
  depth?: string;
}
