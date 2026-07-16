import { z } from 'zod';

export const GetPageOperationsSchema = z.object({
  /** The ID of the page for which operations should be returned. */
  id: z.number(),
});

export type GetPageOperations = z.input<typeof GetPageOperationsSchema>;
