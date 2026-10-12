import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { GenericUserNameSchema, type GenericUserName } from './genericUserName';
import { GenericUserKeySchema, type GenericUserKey } from './genericUserKey';
import { GenericAccountIdSchema, type GenericAccountId } from './genericAccountId';
import { IconSchema, type Icon } from './icon';
import { OperationCheckResultSchema, type OperationCheckResult } from './operationCheckResult';
import { UserDetailsSchema, type UserDetails } from './userDetails';
import { SpaceSchema, type Space, type SpaceInput } from './space';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export interface User {
  type: 'known' | 'unknown' | 'anonymous' | 'user' | (string & {});
  username?: GenericUserName;
  userKey?: GenericUserKey;
  accountId?: GenericAccountId;
  /**
   * The account type of the user, may return empty string if unavailable. App is if the user is a bot user created on
   * behalf of an Atlassian app.
   */
  accountType?: 'atlassian' | 'app' | '' | (string & {});
  /** The email address of the user. Depending on the user's privacy setting, this may return an empty string. */
  email?: string | null;
  /** The public name or nickname of the user. Will always contain a value. */
  publicName?: string;
  profilePicture?: Icon;
  /** The displays name of the user. Depending on the user's privacy setting, this may be the same as publicName. */
  displayName?: string | null;
  /** This displays user time zone. Depending on the user's privacy setting, this may return null. */
  timeZone?: string | null;
  /** This is deprecated. Use `isGuest` instead to find out whether the user is a guest user. */
  externalCollaborator?: boolean;
  /** This is deprecated. Use `isGuest` instead to find out whether the user is a guest user. */
  isExternalCollaborator?: boolean;
  /** Whether the user is a guest user */
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
  accountStatus?: string;
  locale?: string;
  [key: string]: unknown;
}

export type UserInput = unknown;

export const UserSchema: z.ZodType<User, UserInput> = apiObject({
  type: openEnum(['known', 'unknown', 'anonymous', 'user']),
  username: GenericUserNameSchema.optional(),
  userKey: GenericUserKeySchema.optional(),
  accountId: GenericAccountIdSchema.optional(),
  /**
   * The account type of the user, may return empty string if unavailable. App is if the user is a bot user created on
   * behalf of an Atlassian app.
   */
  accountType: openEnum(['atlassian', 'app', '']).optional(),
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
  personalSpace: (z.lazy((): z.ZodType<Space, SpaceInput> => SpaceSchema) as z.ZodType<Space, SpaceInput>).optional(),
  _expandable: apiObject({
    operations: z.string().optional(),
    details: z.string().optional(),
    personalSpace: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema.optional(),
  accountStatus: z.string().optional(),
  locale: z.string().optional(),
});
