import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const BlogPostLikeCountSchema = apiObject({
  /** The count number */
  count: z.number().optional(),
});

export type BlogPostLikeCount = z.infer<typeof BlogPostLikeCountSchema>;
