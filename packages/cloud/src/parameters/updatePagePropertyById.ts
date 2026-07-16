import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models/index.js';

export const UpdatePagePropertyByIdSchema = z
  .object({
    /** The ID of the page the property belongs to. */
    pageId: z.number(),
    /** The ID of the property to be updated. */
    propertyId: z.number(),
  })
  .extend(ContentPropertyUpdateSchema.shape);

export type UpdatePagePropertyById = z.input<typeof UpdatePagePropertyByIdSchema>;
