import { z } from 'zod';

export const DeleteBlogpostPropertyByIdSchema = z.object({
  /** The ID of the blog post the property belongs to. */
  blogpostId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteBlogpostPropertyById = z.input<typeof DeleteBlogpostPropertyByIdSchema>;
