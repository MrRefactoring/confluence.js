import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User } from './user';
import { VersionSchema, type Version } from './version';
import { UsersUserKeysSchema, type UsersUserKeys } from './usersUserKeys';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type ContentHistory = {
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
};

export const ContentHistorySchema: z.ZodType<ContentHistory> = apiObject({
  latest: z.boolean(),
  createdBy: z.lazy(() => UserSchema).optional(),
  ownedBy: z.lazy(() => UserSchema).optional(),
  lastOwnedBy: z.lazy(() => UserSchema).optional(),
  createdDate: z.coerce.date().optional(),
  lastUpdated: z.lazy(() => VersionSchema).optional(),
  previousVersion: z.lazy(() => VersionSchema).optional(),
  contributors: apiObject({
    publishers: z.lazy(() => UsersUserKeysSchema).optional(),
  }).optional(),
  nextVersion: z.lazy(() => VersionSchema).optional(),
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
