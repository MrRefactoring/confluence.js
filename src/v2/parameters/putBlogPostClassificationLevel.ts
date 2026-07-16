import { z } from 'zod';

export const PutBlogPostClassificationLevelSchema = z.object({
  /** The ID of the blog post for which classification level should be updated. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type PutBlogPostClassificationLevel = z.input<typeof PutBlogPostClassificationLevelSchema>;
