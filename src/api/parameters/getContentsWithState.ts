export interface GetContentsWithState {
  /** The key of the space to be queried for its content state settings. */
  spaceKey: string;
  /** The id of the content state to filter content by */
  stateId: number;
  /**
   * A multi-value parameter indicating which properties of the content to expand. Options include: space, version,
   * history, children, etc.
   *
   *     Ex: (space, version);
   */
  expand?: string[];
  /** Maximum number of results to return */
  limit?: number;
  /** Number of result to start returning. (0 indexed) */
  start?: number;
}
