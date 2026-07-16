export interface IsWatchingSpace {
  /** The key of the space to be queried for whether the specified user is watching it. */
  spaceKey: string;
  /**
   * This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See
   * the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details.
   */
  key?: string;
  /**
   * This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See
   * the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details.
   */
  username?: string;
  /**
   * The `accountId` of the user to be queried for whether they are watching the space. The accountId uniquely
   * identifies the user across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.
   */
  accountId: string;
}
