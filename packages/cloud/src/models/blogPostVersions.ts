import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BlogPostVersionSchema } from './blogPostVersion.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const BlogPostVersionsSchema = apiObject({
  results: z.array(BlogPostVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostVersions = z.infer<typeof BlogPostVersionsSchema>;
