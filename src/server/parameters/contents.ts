export interface Contents {
  /**
   * A string indicating if all content, or just the root content of the space is returned. Default value: all. Valid
   * values: all, root.
   */
  depth?: string;
  /** A comma separated list of properties to expand on each piece of content retrieved */
  expand?: string;
  /** The start point of the collection to return */
  start?: number;
  /** The limit of the number of labels to return, this may be restricted by fixed system limits */
  limit?: number;
}
