import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { InlineCommentSchema } from './inlineComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const InlineCommentsSchema = apiObject({
  results: z.array(InlineCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type InlineComments = z.infer<typeof InlineCommentsSchema>;
