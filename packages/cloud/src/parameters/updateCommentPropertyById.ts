import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models/index.js';

export const UpdateCommentPropertyByIdSchema = z
  .object({
    /** The ID of the comment the property belongs to. */
    commentId: z.number(),
    /** The ID of the property to be updated. */
    propertyId: z.number(),
  })
  .extend(ContentPropertyUpdateSchema.shape);

export type UpdateCommentPropertyById = z.input<typeof UpdateCommentPropertyByIdSchema>;
