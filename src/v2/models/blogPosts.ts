import { z } from 'zod';
import { apiObject } from '#/core';
import { BlogPostSummarySchema } from './blogPostSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const BlogPostsSchema = apiObject({
  results: z.array(BlogPostSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPosts = z.infer<typeof BlogPostsSchema>;
