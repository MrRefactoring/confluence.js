import { z } from 'zod';
import { apiObject } from '#/core';

export const UserDetailsSchema = apiObject({
  business: apiObject({
    /**
     * This property has been deprecated due to privacy changes. There is no replacement. See the [migration
     * guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
     * details.
     */
    position: z.string().optional(),
    /**
     * This property has been deprecated due to privacy changes. There is no replacement. See the [migration
     * guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
     * details.
     */
    department: z.string().optional(),
    /**
     * This property has been deprecated due to privacy changes. There is no replacement. See the [migration
     * guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
     * details.
     */
    location: z.string().optional(),
  }).optional(),
  personal: apiObject({
    /**
     * This property has been deprecated due to privacy changes. There is no replacement. See the [migration
     * guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
     * details.
     */
    phone: z.string().optional(),
    /**
     * This property has been deprecated due to privacy changes. There is no replacement. See the [migration
     * guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
     * details.
     */
    im: z.string().optional(),
    /**
     * This property has been deprecated due to privacy changes. There is no replacement. See the [migration
     * guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
     * details.
     */
    website: z.string().optional(),
    /**
     * This property has been deprecated due to privacy changes. Use the `User.email` property instead. See the
     * [migration
     * guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
     * details.
     */
    email: z.string().optional(),
  }).optional(),
});

export type UserDetails = z.infer<typeof UserDetailsSchema>;
