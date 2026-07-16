import { z } from 'zod';
import { apiObject } from '#/core';
import { PageCommentSchema } from './pageComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const PageFooterCommentsSchema = apiObject({
  results: z.array(PageCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageFooterComments = z.infer<typeof PageFooterCommentsSchema>;
