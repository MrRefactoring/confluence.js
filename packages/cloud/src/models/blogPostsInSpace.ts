import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BlogPostSummarySchema } from './blogPostSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const BlogPostsInSpaceSchema = apiObject({
  results: z.array(BlogPostSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostsInSpace = z.infer<typeof BlogPostsInSpaceSchema>;
