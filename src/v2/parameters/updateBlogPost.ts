import { z } from 'zod';

export const UpdateBlogPostSchema = z.object({
  /**
   * The ID of the blog post to be updated. If you don't know the blog post ID, use Get Blog Posts and filter the
   * results.
   */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type UpdateBlogPost = z.input<typeof UpdateBlogPostSchema>;
