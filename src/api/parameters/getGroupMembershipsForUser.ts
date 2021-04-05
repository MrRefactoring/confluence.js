export interface GetGroupMembershipsForUser {
  /** This parameter is no longer available and will be removed from the documentation soon.
    Use `accountId` instead.
    See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** This parameter is no longer available and will be removed from the documentation soon.
    Use `accountId` instead.
    See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products.
    For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`. */
  accountId: string;
  /** The starting index of the returned groups. */
  start?: number;
  /** The maximum number of groups to return per page.
    Note, this may be restricted by fixed system limits. */
  limit?: number;
}
