export interface ContentRestrictionUpdate {
  /** The restriction operation applied to content. */
  operation: string;
  /** The users/groups that the restrictions will be applied to. At least one of
    `user` or `group` must be specified for this object. */
  restrictions: {
    /** The users that the restrictions will be applied to. This array must
        have at least one item, otherwise it should be omitted. */
    user?: {
      /** Set to 'known'. */
      type: string;
      /** This property is no longer available and will be removed from the documentation soon.
            Use `accountId` instead.
            See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
      username?: string;
      /** This property is no longer available and will be removed from the documentation soon.
            Use `accountId` instead.
            See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
      userKey?: string;
      /** The account ID of the user, which uniquely identifies the user across all Atlassian products.
            For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`. */
      accountId: string;
    }[];
    /** The groups that the restrictions will be applied to. This array must
        have at least one item, otherwise it should be omitted. */
    group?: {
      /** Set to 'group'. */
      type: string;
      /** The name of the group. */
      name: string;
    }[];
  };
}
