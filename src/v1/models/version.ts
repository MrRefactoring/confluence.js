import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User } from './user';
import { ContentSchema, type Content } from './content';
import { UsersUserKeysSchema, type UsersUserKeys } from './usersUserKeys';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type Version = {
  by?: User;
  when: Date | null;
  friendlyWhen?: string | null;
  message?: string | null;
  number: number;
  minorEdit: boolean;
  content?: Content;
  collaborators?: UsersUserKeys;
  _expandable?: {
    content?: string;
    collaborators?: string;
  };
  _links?: GenericLinks;
  contentTypeModified?: boolean;
  confRev?: string | null;
  syncRev?: string | null;
  syncRevSource?: string | null;
  ncsStepVersion?: string;
  ncsStepVersionSource?: string;
};

export const VersionSchema: z.ZodType<Version> = apiObject({
  by: z.lazy(() => UserSchema).optional(),
  when: z.coerce.date().nullable(),
  friendlyWhen: z.string().nullish(),
  message: z.string().nullish(),
  /** Set this to the current version number incremented by one */
  number: z.number(),
  /** If `minorEdit` is set to 'true', no notification email or activity stream will be generated for the change. */
  minorEdit: z.boolean(),
  content: z.lazy(() => ContentSchema).optional(),
  collaborators: z.lazy(() => UsersUserKeysSchema).optional(),
  _expandable: apiObject({
    content: z.string().optional(),
    collaborators: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema.optional(),
  /** True if content type is modifed in this version (e.g. page to blog) */
  contentTypeModified: z.boolean().optional(),
  /** The revision id provided by confluence to be used as a revision in Synchrony */
  confRev: z.string().nullish(),
  /** The revision id provided by Synchrony */
  syncRev: z.string().nullish(),
  /** Source of the synchrony revision */
  syncRevSource: z.string().nullish(),
  ncsStepVersion: z.string().optional(),
  ncsStepVersionSource: z.string().optional(),
});
