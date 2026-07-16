import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models/index.js';

export const CreateCommentPropertySchema = z
  .object({
    /** The ID of the comment to create a property for. */
    commentId: z.number(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreateCommentProperty = z.input<typeof CreateCommentPropertySchema>;
