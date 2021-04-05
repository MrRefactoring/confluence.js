export interface RemoveUserFromContentRestriction {
  /** The ID of the content that the restriction applies to. */
  id: string;
  /** The operation that the restriction applies to. */
  operationKey: string;
  /** This parameter is no longer available and will be removed from the documentation soon.
    Use `accountId` instead.
    See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** This parameter is no longer available and will be removed from the documentation soon.
    Use `accountId` instead.
    See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  userName?: string;
  /** The account ID of the user to remove from the content restriction. The accountId uniquely identifies the user
    across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`. */
  accountId: string;
}
