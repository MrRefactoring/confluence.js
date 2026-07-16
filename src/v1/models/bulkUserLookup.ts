import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericUserNameSchema } from './genericUserName';
import { GenericUserKeySchema } from './genericUserKey';
import { GenericAccountIdSchema } from './genericAccountId';
import { IconSchema } from './icon';
import { OperationCheckResultSchema } from './operationCheckResult';
import { UserDetailsSchema } from './userDetails';
import { SpaceSchema } from './space';
import { GenericLinksSchema } from './genericLinks';

export const BulkUserLookupSchema = apiObject({
  type: z.enum(['known', 'unknown', 'anonymous', 'user']),
  username: GenericUserNameSchema.optional(),
  userKey: GenericUserKeySchema.optional(),
  accountId: GenericAccountIdSchema,
  /** The account type of the user, may return empty string if unavailable. */
  accountType: z.string(),
  /** The email address of the user. Depending on the user's privacy setting, this may return an empty string. */
  email: z.string(),
  /** The public name or nickname of the user. Will always contain a value. */
  publicName: z.string(),
  profilePicture: IconSchema,
  /** The displays name of the user. Depending on the user's privacy setting, this may be the same as publicName. */
  displayName: z.string(),
  /** This displays user time zone. Depending on the user's privacy setting, this may return null. */
  timeZone: z.string().nullish(),
  /** This is deprecated. Use `isGuest` instead to find out whether the user is a guest user. */
  isExternalCollaborator: z.boolean().optional(),
  /** Whether the user is a guest user */
  isGuest: z.boolean().optional(),
  operations: z.array(OperationCheckResultSchema).optional(),
  details: UserDetailsSchema.optional(),
  personalSpace: SpaceSchema.optional(),
  _expandable: apiObject({
    operations: z.string().optional(),
    details: z.string().optional(),
    personalSpace: z.string().optional(),
  }),
  _links: GenericLinksSchema,
});

export type BulkUserLookup = z.infer<typeof BulkUserLookupSchema>;
