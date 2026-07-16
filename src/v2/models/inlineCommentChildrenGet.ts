import { z } from 'zod';
import { apiObject } from '#/core';
import { InlineCommentChildrenSchema } from './inlineCommentChildren';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const InlineCommentChildrenGetSchema = apiObject({
  results: z.array(InlineCommentChildrenSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type InlineCommentChildrenGet = z.infer<typeof InlineCommentChildrenGetSchema>;
