import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models/index.js';

export const UpdateFolderPropertyByIdSchema = z
  .object({
    /** The ID of the folder the property belongs to. */
    folderId: z.number(),
    /** The ID of the property to be updated. */
    propertyId: z.number(),
  })
  .extend(ContentPropertyUpdateSchema.shape);

export type UpdateFolderPropertyById = z.input<typeof UpdateFolderPropertyByIdSchema>;
