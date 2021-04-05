export interface GetUser {
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
  /** A multi-value parameter indicating which properties of the user to
    expand.

      - `operations` returns the operations that the user is allowed to do.
      - `details.personal` returns the 'Personal' details in the user's profile, like the 'Email' and 'Phone'.
      Note that these fields have been deprecated due to privacy changes. See the
      [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
      for details.
      - `details.business` returns the 'Company' details in the user's profile, like the 'Position' and 'Department'.
      Note that these fields have been deprecated due to privacy changes. See the
      [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
      for details.
      - personalSpace returns the user's personal space, if it exists.
      - `isExternalCollaborator` returns whether the user is an external collaborator user */
  expand?: string[];
}
