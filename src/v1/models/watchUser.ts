import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericUserNameSchema } from './genericUserName';
import { GenericUserKeySchema } from './genericUserKey';
import { GenericAccountIdSchema } from './genericAccountId';
import { IconSchema } from './icon';
import { OperationCheckResultSchema } from './operationCheckResult';
import { UserDetailsSchema } from './userDetails';
/**
 * This essentially the same as the `User` object, but no `_links` property and* no `_expandable` property (therefore,
 * different required fields).
 */

export const WatchUserSchema = apiObject({
  type: z.string(),
  username: GenericUserNameSchema.optional(),
  userKey: GenericUserKeySchema.optional(),
  accountId: GenericAccountIdSchema,
  profilePicture: IconSchema,
  displayName: z.string(),
  timeZone: z.string().nullish(),
  operations: z.array(OperationCheckResultSchema).nullable(),
  externalCollaborator: z.boolean(),
  isGuest: z.boolean().nullable(),
  isExternalCollaborator: z.boolean(),
  details: UserDetailsSchema.optional(),
  accountType: z.string(),
  email: z.string(),
  publicName: z.string(),
  personalSpace: z.record(z.string(), z.any()).nullable(),
  accountStatus: z.string().optional(),
  locale: z.string().optional(),
  guest: z.boolean().optional(),
});

export type WatchUser = z.infer<typeof WatchUserSchema>;
