import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BlogPostSummarySchema } from './blogPostSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const LabelBlogPostsSchema = apiObject({
  results: z.array(BlogPostSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type LabelBlogPosts = z.infer<typeof LabelBlogPostsSchema>;
