import { z } from 'zod';
import { apiObject } from '#/core';
import { BlogPostVersionSchema } from './blogPostVersion';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const BlogPostVersionsSchema = apiObject({
  results: z.array(BlogPostVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostVersions = z.infer<typeof BlogPostVersionsSchema>;
