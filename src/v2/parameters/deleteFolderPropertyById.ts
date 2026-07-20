import { z } from 'zod';

export const DeleteFolderPropertyByIdSchema = z.object({
  /** The ID of the folder the property belongs to. */
  folderId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteFolderPropertyById = z.input<typeof DeleteFolderPropertyByIdSchema>;
