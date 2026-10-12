import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User, type UserInput } from './user';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export interface UsersUserKeys {
  users?: User[];
  userKeys?: string[];
  _links?: GenericLinks;
  [key: string]: unknown;
}

export type UsersUserKeysInput = unknown;

export const UsersUserKeysSchema: z.ZodType<UsersUserKeys, UsersUserKeysInput> = apiObject({
  users: z.array(z.lazy((): z.ZodType<User, UserInput> => UserSchema) as z.ZodType<User, UserInput>).optional(),
  userKeys: z.array(z.string()).optional(),
  _links: GenericLinksSchema.optional(),
});
