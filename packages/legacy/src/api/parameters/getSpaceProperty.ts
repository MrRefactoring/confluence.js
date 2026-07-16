export interface GetSpaceProperty {
  /** The key of the space that the property is in. */
  spaceKey: string;
  /** The key of the space property. */
  key: string;
  /**
   * A multi-value parameter indicating which properties of the space property to expand. By default, the `version`
   * object is expanded.
   *
   * - `version` returns information about the version of the content.
   * - `space` returns the space that the properties are in.
   */
  expand?: string[];
}
