import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { CustomContentCommentSchema } from './customContentComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const CustomContentCommentsSchema = apiObject({
  results: z.array(CustomContentCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentComments = z.infer<typeof CustomContentCommentsSchema>;
