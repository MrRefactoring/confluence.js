import { z } from 'zod';

export const CreateBulkUserLookupSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateBulkUserLookup = z.input<typeof CreateBulkUserLookupSchema>;
