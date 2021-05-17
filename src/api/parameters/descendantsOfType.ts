export interface DescendantsOfType {
  /** The ID of the content to be queried for its descendants. */
  id: string;
  /** The type of descendants to return. */
  type: string;
  /** A multi-value parameter indicating which properties of the content to expand. */
  expand?: string[];
  /**
   * Filter the results to descendants upto a desired level of the content. Note, the maximum value supported is 100.
   * root level of the content means immediate (level 1) descendants of the type requested. all represents returning all
   * descendants of the type requested.
   */
  depth?: string;
  /** The starting index of the returned content. */
  start?: number;
  /** The maximum number of content to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
