import { z } from 'zod';
import { apiObject } from '#/core';
import { BlogPostSummarySchema } from './blogPostSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const LabelBlogPostsSchema = apiObject({
  results: z.array(BlogPostSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type LabelBlogPosts = z.infer<typeof LabelBlogPostsSchema>;
