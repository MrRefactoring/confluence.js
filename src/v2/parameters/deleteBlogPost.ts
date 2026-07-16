import { z } from 'zod';

export const DeleteBlogPostSchema = z.object({
  /** The ID of the blog post to be deleted. */
  id: z.number(),
  /** If attempting to purge the blog post. */
  purge: z.boolean().optional(),
  /** If attempting to delete a blog post that is a draft. */
  draft: z.boolean().optional(),
});

export type DeleteBlogPost = z.input<typeof DeleteBlogPostSchema>;
