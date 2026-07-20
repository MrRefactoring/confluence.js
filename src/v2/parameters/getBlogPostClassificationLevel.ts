import { z } from 'zod';

export const GetBlogPostClassificationLevelSchema = z.object({
  /** The ID of the blog post for which classification level should be returned. */
  id: z.number(),
  /** Status of blog post from which classification level will fetched. */
  status: z.enum(['current', 'draft', 'archived']).optional(),
});

export type GetBlogPostClassificationLevel = z.input<typeof GetBlogPostClassificationLevelSchema>;
