import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User, type UserInput } from './user';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export interface UserArray {
  results: User[];
  start?: number;
  limit?: number;
  size?: number;
  /**
   * This property will return total count of the objects before pagination is applied. This value is returned if
   * `shouldReturnTotalSize` is set to `true`.
   */
  totalSize?: number;
  _links?: GenericLinks;
  [key: string]: unknown;
}

export type UserArrayInput = unknown;

export const UserArraySchema: z.ZodType<UserArray, UserArrayInput> = apiObject({
  results: z.array(z.lazy((): z.ZodType<User, UserInput> => UserSchema) as z.ZodType<User, UserInput>),
  start: z.number().optional(),
  limit: z.number().optional(),
  size: z.number().optional(),
  /**
   * This property will return total count of the objects before pagination is applied. This value is returned if
   * `shouldReturnTotalSize` is set to `true`.
   */
  totalSize: z.number().optional(),
  _links: GenericLinksSchema.optional(),
});
