import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';

export const RelationDataSchema = apiObject({
  createdBy: UserSchema.optional(),
  createdDate: z.coerce.date().optional(),
  friendlyCreatedDate: z.string().optional(),
});

export type RelationData = z.infer<typeof RelationDataSchema>;
