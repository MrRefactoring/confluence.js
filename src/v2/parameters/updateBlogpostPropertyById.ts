import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdateBlogpostPropertyByIdSchema = z.object({}).extend(ContentPropertyUpdateSchema.shape).extend({
  /** The ID of the blog post the property belongs to. */
  blogpostId: z.number(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdateBlogpostPropertyById = z.input<typeof UpdateBlogpostPropertyByIdSchema>;
