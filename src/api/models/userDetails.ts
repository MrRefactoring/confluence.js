export interface UserDetails {
  business?: {
    /** This property has been deprecated due to privacy changes. There is no replacement. See the
        [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
        for details. */
    position?: string;
    /** This property has been deprecated due to privacy changes. There is no replacement. See the
        [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
        for details. */
    department?: string;
    /** This property has been deprecated due to privacy changes. There is no replacement. See the
        [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
        for details. */
    location?: string;
  };
  personal?: {
    /** This property has been deprecated due to privacy changes. There is no replacement. See the
        [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
        for details. */
    phone?: string;
    /** This property has been deprecated due to privacy changes. There is no replacement. See the
        [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
        for details. */
    im?: string;
    /** This property has been deprecated due to privacy changes. There is no replacement. See the
        [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
        for details. */
    website?: string;
    /** This property has been deprecated due to privacy changes. Use the `User.email` property instead. See the
        [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
        for details. */
    email?: string;
  };
}
