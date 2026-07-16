import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AccountStatusSchema } from '#/models/accountStatus';
import { AccountTypeSchema } from '#/models/accountType';
import { IconSchema } from '#/models/icon';

export const UserSchema = apiObject({
  /** Display name of the user. */
  displayName: z.string().optional(),
  /** Time zone of the user. Depending on the user's privacy setting, this may return null. */
  timeZone: z.string().nullish(),
  /** Space ID of the user's personal space. Returns null, if no personal space for the user. */
  personalSpaceId: z.string().nullish(),
  /** Whether the user is an external collaborator. */
  isExternalCollaborator: z.boolean().optional(),
  accountStatus: AccountStatusSchema.optional(),
  /** Account ID of the user. */
  accountId: z.string().optional(),
  /** The email address of the user. Depending on the user's privacy setting, this may return an empty string. */
  email: z.string().optional(),
  accountType: AccountTypeSchema.optional(),
  /** Public name of the user. */
  publicName: z.string().optional(),
  profilePicture: IconSchema.nullish(),
});

export type User = z.infer<typeof UserSchema>;
