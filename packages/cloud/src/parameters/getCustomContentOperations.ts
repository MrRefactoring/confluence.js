import { z } from 'zod';

export const GetCustomContentOperationsSchema = z.object({
  /** The ID of the custom content for which operations should be returned. */
  id: z.number(),
});

export type GetCustomContentOperations = z.input<typeof GetCustomContentOperationsSchema>;
