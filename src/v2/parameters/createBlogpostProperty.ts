import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateBlogpostPropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the blog post to create a property for. */
  blogpostId: z.number(),
});

export type CreateBlogpostProperty = z.input<typeof CreateBlogpostPropertySchema>;
