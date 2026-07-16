import { z } from 'zod';

export const DeleteFooterCommentSchema = z.object({
  /** The ID of the comment to be retrieved. */
  commentId: z.number(),
});

export type DeleteFooterComment = z.input<typeof DeleteFooterCommentSchema>;
