export interface GetGroupMembershipsForUser {
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.
   */
  accountId: string;
  /** The starting index of the returned groups. */
  start?: number;
  /** The maximum number of groups to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
