import { z } from 'zod';
import { apiObject } from '#/core';
import { BlogPostCommentSchema } from './blogPostComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const BlogPostFooterCommentsSchema = apiObject({
  results: z.array(BlogPostCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostFooterComments = z.infer<typeof BlogPostFooterCommentsSchema>;
