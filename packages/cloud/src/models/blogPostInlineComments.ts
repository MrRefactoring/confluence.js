import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BlogPostInlineCommentSchema } from './blogPostInlineComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const BlogPostInlineCommentsSchema = apiObject({
  results: z.array(BlogPostInlineCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostInlineComments = z.infer<typeof BlogPostInlineCommentsSchema>;
