import { z } from 'zod';

export const DeleteInlineCommentSchema = z.object({
  /** The ID of the comment to be deleted. */
  commentId: z.number(),
});

export type DeleteInlineComment = z.input<typeof DeleteInlineCommentSchema>;
