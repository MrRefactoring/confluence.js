import { z } from 'zod';

export const GetBlogPostOperationsSchema = z.object({
  /** The ID of the blog post for which operations should be returned. */
  id: z.number(),
});

export type GetBlogPostOperations = z.input<typeof GetBlogPostOperationsSchema>;
