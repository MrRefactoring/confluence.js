import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models/index.js';

export const UpdateWhiteboardPropertyByIdSchema = z
  .object({
    /** The ID of the whiteboard the property belongs to. */
    whiteboardId: z.number(),
    /** The ID of the property to be updated. */
    propertyId: z.number(),
  })
  .extend(ContentPropertyUpdateSchema.shape);

export type UpdateWhiteboardPropertyById = z.input<typeof UpdateWhiteboardPropertyByIdSchema>;
