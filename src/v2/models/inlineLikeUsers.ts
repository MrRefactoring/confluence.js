import { z } from 'zod';
import { apiObject } from '#/core';
import { LikeSchema } from './like';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const InlineLikeUsersSchema = apiObject({
  results: z.array(LikeSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type InlineLikeUsers = z.infer<typeof InlineLikeUsersSchema>;
