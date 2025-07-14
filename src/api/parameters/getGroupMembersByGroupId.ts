export interface GetGroupMembersByGroupId {
  /** The id of the group to be queried for its members. */
  groupId: string;
  /** The starting index of the returned users. */
  start?: number;
  /** The maximum number of users to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
  /**
   * Whether to include total size parameter in the results. Note, fetching total size property is an expensive
   * operation; use it if your use case needs this value.
   */
  shouldReturnTotalSize?: boolean;
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations that the user is allowed to do.
   * - `personalSpace` returns the user's personal space, if it exists.
   */
  expand?: 'operations' | 'personalSpace' | string | ('operations' | 'personalSpace' | string)[];
}
