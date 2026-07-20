import { z } from 'zod';
import { apiObject } from '#/core';
import { CommentVersionSchema } from './commentVersion';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const InlineCommentVersionsSchema = apiObject({
  results: z.array(CommentVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type InlineCommentVersions = z.infer<typeof InlineCommentVersionsSchema>;
