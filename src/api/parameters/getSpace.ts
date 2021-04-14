export interface GetSpace {
  /** The key of the space to be returned. */
  spaceKey: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
}
