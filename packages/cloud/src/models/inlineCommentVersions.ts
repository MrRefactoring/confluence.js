import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { CommentVersionSchema } from './commentVersion.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const InlineCommentVersionsSchema = apiObject({
  results: z.array(CommentVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type InlineCommentVersions = z.infer<typeof InlineCommentVersionsSchema>;
