import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User, type UserInput } from './user';
import { VersionSchema, type Version, type VersionInput } from './version';
import { UsersUserKeysSchema, type UsersUserKeys, type UsersUserKeysInput } from './usersUserKeys';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export interface ContentHistory {
  latest: boolean;
  createdBy?: User;
  ownedBy?: User;
  lastOwnedBy?: User;
  createdDate?: Date;
  lastUpdated?: Version;
  previousVersion?: Version;
  contributors?: {
    publishers?: UsersUserKeys;
  };
  nextVersion?: Version;
  _expandable?: {
    lastUpdated?: string;
    previousVersion?: string;
    contributors?: string;
    nextVersion?: string;
    ownedBy?: string;
    lastOwnedBy?: string;
  };
  _links?: GenericLinks;
  [key: string]: unknown;
}

export type ContentHistoryInput = unknown;

export const ContentHistorySchema: z.ZodType<ContentHistory, ContentHistoryInput> = apiObject({
  latest: z.boolean(),
  createdBy: (z.lazy((): z.ZodType<User, UserInput> => UserSchema) as z.ZodType<User, UserInput>).optional(),
  ownedBy: (z.lazy((): z.ZodType<User, UserInput> => UserSchema) as z.ZodType<User, UserInput>).optional(),
  lastOwnedBy: (z.lazy((): z.ZodType<User, UserInput> => UserSchema) as z.ZodType<User, UserInput>).optional(),
  createdDate: z.coerce.date().optional(),
  lastUpdated: (
    z.lazy((): z.ZodType<Version, VersionInput> => VersionSchema) as z.ZodType<Version, VersionInput>
  ).optional(),
  previousVersion: (
    z.lazy((): z.ZodType<Version, VersionInput> => VersionSchema) as z.ZodType<Version, VersionInput>
  ).optional(),
  contributors: apiObject({
    publishers: (
      z.lazy((): z.ZodType<UsersUserKeys, UsersUserKeysInput> => UsersUserKeysSchema) as z.ZodType<
        UsersUserKeys,
        UsersUserKeysInput
      >
    ).optional(),
  }).optional(),
  nextVersion: (
    z.lazy((): z.ZodType<Version, VersionInput> => VersionSchema) as z.ZodType<Version, VersionInput>
  ).optional(),
  _expandable: apiObject({
    lastUpdated: z.string().optional(),
    previousVersion: z.string().optional(),
    contributors: z.string().optional(),
    nextVersion: z.string().optional(),
    ownedBy: z.string().optional(),
    lastOwnedBy: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema.optional(),
});
