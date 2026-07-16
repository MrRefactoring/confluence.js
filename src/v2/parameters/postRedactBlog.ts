import { z } from 'zod';

export const PostRedactBlogSchema = z.object({
  /** The ID of the blog post to redact content from. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type PostRedactBlog = z.input<typeof PostRedactBlogSchema>;
