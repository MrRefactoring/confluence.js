export interface UserDetails {
  business?: {
    /**
     * @deprecated This property has been deprecated due to privacy changes. There is no replacement. See the
     * [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
     * for details.
     */
    position?: string;
    /**
     * @deprecated This property has been deprecated due to privacy changes. There is no replacement. See the
     * [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
     * for details.
     */
    department?: string;
    /**
     * @deprecated This property has been deprecated due to privacy changes. There is no replacement. See the
     * [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
     * for details.
     */
    location?: string;
  };
  personal?: {
    /**
     * @deprecated This property has been deprecated due to privacy changes. There is no replacement. See the
     * [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
     * for details.
     */
    phone?: string;
    /**
     * @deprecated This property has been deprecated due to privacy changes. There is no replacement. See the
     * [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
     * for details.
     */
    im?: string;
    /**
     * @deprecated This property has been deprecated due to privacy changes. There is no replacement. See the
     * [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
     * for details.
     */
    website?: string;
    /**
     * @deprecated This property has been deprecated due to privacy changes. Use the `User.email` property instead. See the
     * [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
     * for details.
     */
    email?: string;
  };
}
