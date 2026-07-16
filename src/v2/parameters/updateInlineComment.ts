import { z } from 'zod';
import { UpdateInlineCommentModelSchema } from '../models';

export const UpdateInlineCommentSchema = z
  .object({
    /** The ID of the comment to be retrieved. */
    commentId: z.number(),
  })
  .extend(UpdateInlineCommentModelSchema.shape);

export type UpdateInlineComment = z.input<typeof UpdateInlineCommentSchema>;
