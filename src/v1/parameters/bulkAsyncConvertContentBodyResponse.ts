import { z } from 'zod';

export const BulkAsyncConvertContentBodyResponseSchema = z.object({
  /** The asyncIds of the conversion tasks. */
  ids: z.array(z.string()),
});

export type BulkAsyncConvertContentBodyResponse = z.input<typeof BulkAsyncConvertContentBodyResponseSchema>;
