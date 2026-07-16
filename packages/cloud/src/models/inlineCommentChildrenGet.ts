import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { InlineCommentChildrenSchema } from './inlineCommentChildren.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const InlineCommentChildrenGetSchema = apiObject({
  results: z.array(InlineCommentChildrenSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type InlineCommentChildrenGet = z.infer<typeof InlineCommentChildrenGetSchema>;
