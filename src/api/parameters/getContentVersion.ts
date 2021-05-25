export interface GetContentVersion {
  /** The ID of the content to be queried for its version. */
  id: string;
  /** The number of the version to be retrieved. */
  versionNumber: number;
  /**
   * A multi-value parameter indicating which properties of the content to expand. By default, the `content` object is expanded.
   *
   * - `collaborators` returns the users that collaborated on the version.
   * - `content` returns the content for the version.
   */
  expand?: string[];
}
