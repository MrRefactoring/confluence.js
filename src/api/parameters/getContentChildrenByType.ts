export interface GetContentChildrenByType {
  /** The ID of the content to be queried for its children. */
  id: string;
  /** The type of children to return. */
  type: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
  /** The version of the parent content to retrieve children for.
    Currently, this only works for the latest version. */
  parentVersion?: number;
  /** The starting index of the returned content. */
  start?: number;
  /** The maximum number of content to return per page. Note,
    this may be restricted by fixed system limits. */
  limit?: number;
}
