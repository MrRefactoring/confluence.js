import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models/index.js';

export const UpdateCustomContentPropertyByIdSchema = z
  .object({
    /** The ID of the custom content the property belongs to. */
    customContentId: z.number(),
    /** The ID of the property to be updated. */
    propertyId: z.number(),
  })
  .extend(ContentPropertyUpdateSchema.shape);

export type UpdateCustomContentPropertyById = z.input<typeof UpdateCustomContentPropertyByIdSchema>;
