import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ChildrenCommentSchema } from './childrenComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const FooterCommentChildrenSchema = apiObject({
  results: z.array(ChildrenCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FooterCommentChildren = z.infer<typeof FooterCommentChildrenSchema>;
