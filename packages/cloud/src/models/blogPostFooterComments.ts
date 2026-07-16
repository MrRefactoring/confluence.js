import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BlogPostCommentSchema } from './blogPostComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const BlogPostFooterCommentsSchema = apiObject({
  results: z.array(BlogPostCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostFooterComments = z.infer<typeof BlogPostFooterCommentsSchema>;
