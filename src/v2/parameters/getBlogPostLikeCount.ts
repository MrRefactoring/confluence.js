import { z } from 'zod';

export const GetBlogPostLikeCountSchema = z.object({
  /** The ID of the blog post for which like count should be returned. */
  id: z.number(),
});

export type GetBlogPostLikeCount = z.input<typeof GetBlogPostLikeCountSchema>;
