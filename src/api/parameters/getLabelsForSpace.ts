export interface GetLabelsForSpace {
  /** The key of the space to get labels for. */
  spaceKey: string;
  /**
   * Filters the results to labels with the specified prefix. If this parameter is not specified, then labels with any
   * prefix will be returned.
   *
   *     - `global` prefix is used by labels that are on content within the provided space.
   *     - `my` prefix can be explicitly added by a user when adding a label
   *     via the UI, e.g. 'my:example-label'.
   *     - `team` prefix is used for labels applied to the space.
   */
  prefix?: string;
  /** The starting index of the returned labels. */
  start?: number;
  /** The maximum number of labels to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
