import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User, type UserInput } from './user';
import { ContentSchema, type Content, type ContentInput } from './content';
import { UsersUserKeysSchema, type UsersUserKeys, type UsersUserKeysInput } from './usersUserKeys';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export interface Version {
  by?: User;
  when: Date | null;
  friendlyWhen?: string | null;
  message?: string | null;
  /** Set this to the current version number incremented by one */
  number: number;
  /** If `minorEdit` is set to 'true', no notification email or activity stream will be generated for the change. */
  minorEdit: boolean;
  content?: Content;
  collaborators?: UsersUserKeys;
  _expandable?: {
    content?: string;
    collaborators?: string;
  };
  _links?: GenericLinks;
  /** True if content type is modifed in this version (e.g. page to blog) */
  contentTypeModified?: boolean;
  /** The revision id provided by confluence to be used as a revision in Synchrony */
  confRev?: string | null;
  /** The revision id provided by Synchrony */
  syncRev?: string | null;
  /** Source of the synchrony revision */
  syncRevSource?: string | null;
  ncsStepVersion?: string;
  ncsStepVersionSource?: string;
  [key: string]: unknown;
}

export type VersionInput = unknown;

export const VersionSchema: z.ZodType<Version, VersionInput> = apiObject({
  by: (z.lazy((): z.ZodType<User, UserInput> => UserSchema) as z.ZodType<User, UserInput>).optional(),
  when: z.coerce.date().nullable(),
  friendlyWhen: z.string().nullish(),
  message: z.string().nullish(),
  /** Set this to the current version number incremented by one */
  number: z.number(),
  /** If `minorEdit` is set to 'true', no notification email or activity stream will be generated for the change. */
  minorEdit: z.boolean(),
  content: (
    z.lazy((): z.ZodType<Content, ContentInput> => ContentSchema) as z.ZodType<Content, ContentInput>
  ).optional(),
  collaborators: (
    z.lazy((): z.ZodType<UsersUserKeys, UsersUserKeysInput> => UsersUserKeysSchema) as z.ZodType<
      UsersUserKeys,
      UsersUserKeysInput
    >
  ).optional(),
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
