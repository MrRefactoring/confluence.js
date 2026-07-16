import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { LikeSchema } from './like.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const BlogPostLikeUsersSchema = apiObject({
  results: z.array(LikeSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type BlogPostLikeUsers = z.infer<typeof BlogPostLikeUsersSchema>;
