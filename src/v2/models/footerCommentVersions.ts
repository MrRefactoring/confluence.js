import { z } from 'zod';
import { apiObject } from '#/core';
import { CommentVersionSchema } from './commentVersion';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const FooterCommentVersionsSchema = apiObject({
  results: z.array(CommentVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FooterCommentVersions = z.infer<typeof FooterCommentVersionsSchema>;
