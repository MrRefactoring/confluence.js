import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { FooterCommentSchema } from './footerComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const FooterCommentsSchema = apiObject({
  results: z.array(FooterCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FooterComments = z.infer<typeof FooterCommentsSchema>;
