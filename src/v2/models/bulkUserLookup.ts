import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const BulkUserLookupSchema = apiObject({
  results: z.array(UserSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BulkUserLookup = z.infer<typeof BulkUserLookupSchema>;
