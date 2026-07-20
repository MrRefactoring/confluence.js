import { z } from 'zod';
/**
 * This property is no longer available and will be removed from the documentation soon.* Use `accountId` instead.* See
 * the [deprecation
 * notice](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
 * details.
 */

export const GenericUserKeySchema = z.string().nullable();

export type GenericUserKey = z.infer<typeof GenericUserKeySchema>;
