import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { UserSchema } from './user.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const BulkUserLookupSchema = apiObject({
  results: z.array(UserSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BulkUserLookup = z.infer<typeof BulkUserLookupSchema>;
