import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { PageInlineCommentSchema } from './pageInlineComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const PageInlineCommentsSchema = apiObject({
  results: z.array(PageInlineCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageInlineComments = z.infer<typeof PageInlineCommentsSchema>;
