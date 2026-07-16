import { z } from 'zod';

export const GetBlogPostVersionDetailsSchema = z.object({
  /** The ID of the blog post for which version details should be returned. */
  blogpostId: z.number(),
  /** The version number of the blog post to be returned. */
  versionNumber: z.number(),
});

export type GetBlogPostVersionDetails = z.input<typeof GetBlogPostVersionDetailsSchema>;
