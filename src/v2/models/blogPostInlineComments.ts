import { z } from 'zod';
import { apiObject } from '#/core';
import { BlogPostInlineCommentSchema } from './blogPostInlineComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const BlogPostInlineCommentsSchema = apiObject({
  results: z.array(BlogPostInlineCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostInlineComments = z.infer<typeof BlogPostInlineCommentsSchema>;
