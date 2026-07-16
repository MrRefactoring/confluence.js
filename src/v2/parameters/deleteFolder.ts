import { z } from 'zod';

export const DeleteFolderSchema = z.object({
  /** The ID of the folder to be deleted. */
  id: z.number(),
});

export type DeleteFolder = z.input<typeof DeleteFolderSchema>;
