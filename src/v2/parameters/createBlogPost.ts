import { z } from 'zod';

export const CreateBlogPostSchema = z.object({
  /**
   * The blog post will be private. Only the user who creates this blog post will have permission to view and edit
   * one.
   */
  private: z.boolean().optional(),
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateBlogPost = z.input<typeof CreateBlogPostSchema>;
