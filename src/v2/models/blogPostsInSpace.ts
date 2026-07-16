import { z } from 'zod';
import { apiObject } from '#/core';
import { BlogPostSummarySchema } from './blogPostSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const BlogPostsInSpaceSchema = apiObject({
  results: z.array(BlogPostSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostsInSpace = z.infer<typeof BlogPostsInSpaceSchema>;
