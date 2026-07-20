import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkUserLookupSchema } from './bulkUserLookup';
import { GenericLinksSchema } from './genericLinks';

export const BulkUserLookupArraySchema = apiObject({
  results: z.array(BulkUserLookupSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type BulkUserLookupArray = z.infer<typeof BulkUserLookupArraySchema>;
