import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User, type UserInput } from './user';

export const RelationDataSchema = apiObject({
  createdBy: (UserSchema as z.ZodType<User, UserInput>).optional(),
  createdDate: z.coerce.date().optional(),
  friendlyCreatedDate: z.string().optional(),
});

export type RelationData = z.infer<typeof RelationDataSchema>;
