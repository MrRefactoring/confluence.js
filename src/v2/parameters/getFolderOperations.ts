import { z } from 'zod';

export const GetFolderOperationsSchema = z.object({
  /** The ID of the folder for which operations should be returned. */
  id: z.number(),
});

export type GetFolderOperations = z.input<typeof GetFolderOperationsSchema>;
