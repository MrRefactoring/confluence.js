import { z } from 'zod';

export const DeleteCommentPropertyByIdSchema = z.object({
  /** The ID of the comment the property belongs to. */
  commentId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteCommentPropertyById = z.input<typeof DeleteCommentPropertyByIdSchema>;
