export interface AddContentWatcher {
  /** The ID of the content to add the watcher to. */
  contentId: string;
  /** This parameter is no longer available and will be removed from the documentation soon.
   Use `accountId` instead.
   See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** This parameter is no longer available and will be removed from the documentation soon.
   Use `accountId` instead.
   See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** The `accountId` of the user to be added as a watcher. The accountId uniquely identifies the user across all Atlassian products.
   For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`. */
  accountId: string;
}
