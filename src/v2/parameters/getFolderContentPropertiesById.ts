import { z } from 'zod';

export const GetFolderContentPropertiesByIdSchema = z.object({
  /** The ID of the folder for which content properties should be returned. */
  folderId: z.number(),
  /** The ID of the content property being requested. */
  propertyId: z.number(),
});

export type GetFolderContentPropertiesById = z.input<typeof GetFolderContentPropertiesByIdSchema>;
