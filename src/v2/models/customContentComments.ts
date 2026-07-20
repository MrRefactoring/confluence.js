import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomContentCommentSchema } from './customContentComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const CustomContentCommentsSchema = apiObject({
  results: z.array(CustomContentCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentComments = z.infer<typeof CustomContentCommentsSchema>;
