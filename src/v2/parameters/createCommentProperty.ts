import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateCommentPropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the comment to create a property for. */
  commentId: z.number(),
});

export type CreateCommentProperty = z.input<typeof CreateCommentPropertySchema>;
