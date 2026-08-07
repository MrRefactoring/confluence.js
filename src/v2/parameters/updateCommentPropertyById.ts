import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdateCommentPropertyByIdSchema = z.object({}).extend(ContentPropertyUpdateSchema.shape).extend({
  /** The ID of the comment the property belongs to. */
  commentId: z.number(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdateCommentPropertyById = z.input<typeof UpdateCommentPropertyByIdSchema>;
