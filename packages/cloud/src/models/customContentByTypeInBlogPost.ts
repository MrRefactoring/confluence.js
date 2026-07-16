import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { CustomContentSummarySchema } from './customContentSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const CustomContentByTypeInBlogPostSchema = apiObject({
  results: z.array(CustomContentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentByTypeInBlogPost = z.infer<typeof CustomContentByTypeInBlogPostSchema>;
