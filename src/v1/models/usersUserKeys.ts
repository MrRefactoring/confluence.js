import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User } from './user';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type UsersUserKeys = {
  users?: User[];
  userKeys?: string[];
  _links?: GenericLinks;
};

export const UsersUserKeysSchema: z.ZodType<UsersUserKeys> = apiObject({
  users: z.array(z.lazy(() => UserSchema)).optional(),
  userKeys: z.array(z.string()).optional(),
  _links: GenericLinksSchema.optional(),
});
