export interface AddLabelWatcher {
  /** Note, you must add header when making a request, as this operation has XSRF protection. */
  'X-Atlassian-Token': string;
  /** The name of the label to add the watcher to. */
  labelName: string;
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
   * The `accountId` of the user to be added as a watcher. The accountId uniquely identifies the user across all
   * Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.
   */
  accountId: string;
}
