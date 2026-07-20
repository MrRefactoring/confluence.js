import { z } from 'zod';
import { apiObject } from '#/core';
import { PageInlineCommentSchema } from './pageInlineComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const PageInlineCommentsSchema = apiObject({
  results: z.array(PageInlineCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageInlineComments = z.infer<typeof PageInlineCommentsSchema>;
