import { z } from 'zod';
/**
 * This property is no longer available and will be removed from the documentation soon.* Use `accountId` instead.* See
 * the [deprecation
 * notice](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for
 * details.
 */

export const GenericUserNameSchema = z.string().nullable();

export type GenericUserName = z.infer<typeof GenericUserNameSchema>;
