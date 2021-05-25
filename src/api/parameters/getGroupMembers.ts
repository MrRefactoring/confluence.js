export interface GetGroupMembers {
  /** The name of the group to be queried for its members. */
  groupName: string;
  /** The starting index of the returned users. */
  start?: number;
  /** The maximum number of users to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
