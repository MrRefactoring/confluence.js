export interface GetCurrentUser {
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
      - personalSpace returns the user's personal space, if it exists. */
  expand?: string[];
}
