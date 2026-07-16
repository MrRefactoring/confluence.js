import { z } from 'zod';
import { apiObject } from '#/core';
import { FooterCommentSchema } from './footerComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const FooterCommentsSchema = apiObject({
  results: z.array(FooterCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FooterComments = z.infer<typeof FooterCommentsSchema>;
