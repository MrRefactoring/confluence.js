import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdateFolderPropertyByIdSchema = z.object({}).extend(ContentPropertyUpdateSchema.shape).extend({
  /** The ID of the folder the property belongs to. */
  folderId: z.number(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdateFolderPropertyById = z.input<typeof UpdateFolderPropertyByIdSchema>;
