export interface GetContentForSpace {
  /** The key of the space to be queried for its content. */
  spaceKey: string;
  /** Filter the results to content at the root level of the space or all content. */
  depth?: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
  /** The starting index of the returned content. */
  start?: number;
  /** The maximum number of content objects to return per page. Note, this
   may be restricted by fixed system limits. */
  limit?: number;
}
