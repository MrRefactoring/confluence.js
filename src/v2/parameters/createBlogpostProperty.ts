import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateBlogpostPropertySchema = z
  .object({
    /** The ID of the blog post to create a property for. */
    blogpostId: z.number(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreateBlogpostProperty = z.input<typeof CreateBlogpostPropertySchema>;
