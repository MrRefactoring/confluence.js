export interface GetHistoryForContent {
  /** The ID of the content to be queried for its history. */
  id: string;
  /**
   * A multi-value parameter indicating which properties of the content history to expand. Maximum sub-expansions allowed is `8`.
   *
   * - `lastUpdated` returns information about the most recent update of the content, including who updated it and when it
   *   was updated.
   * - `previousVersion` returns information about the update prior to the current content update. For this method, it
   *   contains the same information as `lastUpdated`.
   * - `contributors` returns all of the users who have contributed to the content.
   * - `nextVersion` This parameter is not used for this method.
   */
  expand?: string[];
}
