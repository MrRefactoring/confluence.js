import { z } from 'zod';

export const UpdateFooterCommentSchema = z.object({
  /** The ID of the comment to be retrieved. */
  commentId: z.number(),
  body: z.record(z.string(), z.any()),
});

export type UpdateFooterComment = z.input<typeof UpdateFooterCommentSchema>;
