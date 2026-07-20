import { z } from 'zod';
import { apiObject } from '#/core';
import { ChildrenCommentSchema } from './childrenComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const FooterCommentChildrenSchema = apiObject({
  results: z.array(ChildrenCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FooterCommentChildren = z.infer<typeof FooterCommentChildrenSchema>;
