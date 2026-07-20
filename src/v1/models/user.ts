import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericUserNameSchema, type GenericUserName } from './genericUserName';
import { GenericUserKeySchema, type GenericUserKey } from './genericUserKey';
import { GenericAccountIdSchema, type GenericAccountId } from './genericAccountId';
import { IconSchema, type Icon } from './icon';
import { OperationCheckResultSchema, type OperationCheckResult } from './operationCheckResult';
import { UserDetailsSchema, type UserDetails } from './userDetails';
import { SpaceSchema, type Space } from './space';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type User = {
  type: 'known' | 'unknown' | 'anonymous' | 'user';
  username?: GenericUserName;
  userKey?: GenericUserKey;
  accountId?: GenericAccountId;
  accountType?: 'atlassian' | 'app' | '';
  email?: string | null;
  publicName?: string;
  profilePicture?: Icon;
  displayName?: string | null;
  timeZone?: string | null;
  externalCollaborator?: boolean;
  isExternalCollaborator?: boolean;
  isGuest?: boolean;
  operations?: OperationCheckResult[] | null;
  details?: UserDetails;
  personalSpace?: Space;
  _expandable?: {
    operations?: string;
    details?: string;
    personalSpace?: string;
  };
  _links?: GenericLinks;
};

export const UserSchema: z.ZodType<User> = apiObject({
  type: z.enum(['known', 'unknown', 'anonymous', 'user']),
  username: GenericUserNameSchema.optional(),
  userKey: GenericUserKeySchema.optional(),
  accountId: GenericAccountIdSchema.optional(),
  /**
   * The account type of the user, may return empty string if unavailable. App is if the user is a bot user created on
   * behalf of an Atlassian app.
   */
  accountType: z.enum(['atlassian', 'app', '']).optional(),
  /** The email address of the user. Depending on the user's privacy setting, this may return an empty string. */
  email: z.string().nullish(),
  /** The public name or nickname of the user. Will always contain a value. */
  publicName: z.string().optional(),
  profilePicture: IconSchema.optional(),
  /** The displays name of the user. Depending on the user's privacy setting, this may be the same as publicName. */
  displayName: z.string().nullish(),
  /** This displays user time zone. Depending on the user's privacy setting, this may return null. */
  timeZone: z.string().nullish(),
  /** This is deprecated. Use `isGuest` instead to find out whether the user is a guest user. */
  externalCollaborator: z.boolean().optional(),
  /** This is deprecated. Use `isGuest` instead to find out whether the user is a guest user. */
  isExternalCollaborator: z.boolean().optional(),
  /** Whether the user is a guest user */
  isGuest: z.boolean().optional(),
  operations: z.array(OperationCheckResultSchema).nullish(),
  details: UserDetailsSchema.optional(),
  personalSpace: z.lazy(() => SpaceSchema).optional(),
  _expandable: apiObject({
    operations: z.string().optional(),
    details: z.string().optional(),
    personalSpace: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema.optional(),
});
