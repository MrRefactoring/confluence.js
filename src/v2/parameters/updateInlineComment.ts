import { z } from 'zod';
import { UpdateInlineCommentModelSchema } from '../models';

export const UpdateInlineCommentSchema = z.object({}).extend(UpdateInlineCommentModelSchema.shape).extend({
  /** The ID of the comment to be retrieved. */
  commentId: z.number(),
});

export type UpdateInlineComment = z.input<typeof UpdateInlineCommentSchema>;
