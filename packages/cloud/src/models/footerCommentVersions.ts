import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { CommentVersionSchema } from './commentVersion.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const FooterCommentVersionsSchema = apiObject({
  results: z.array(CommentVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FooterCommentVersions = z.infer<typeof FooterCommentVersionsSchema>;
