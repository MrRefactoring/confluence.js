import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User } from './user';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type UserArray = {
  results: User[];
  start?: number;
  limit?: number;
  size?: number;
  totalSize?: number;
  _links?: GenericLinks;
};

export const UserArraySchema: z.ZodType<UserArray> = apiObject({
  results: z.array(z.lazy(() => UserSchema)),
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
