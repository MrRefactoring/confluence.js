import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { PageCommentSchema } from './pageComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const PageFooterCommentsSchema = apiObject({
  results: z.array(PageCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageFooterComments = z.infer<typeof PageFooterCommentsSchema>;
