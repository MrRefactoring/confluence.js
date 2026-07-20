import { z } from 'zod';

export const GetSpaceOperationsSchema = z.object({
  /** The ID of the space for which operations should be returned. */
  id: z.number(),
});

export type GetSpaceOperations = z.input<typeof GetSpaceOperationsSchema>;
