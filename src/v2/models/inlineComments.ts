import { z } from 'zod';
import { apiObject } from '#/core';
import { InlineCommentSchema } from './inlineComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const InlineCommentsSchema = apiObject({
  results: z.array(InlineCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type InlineComments = z.infer<typeof InlineCommentsSchema>;
