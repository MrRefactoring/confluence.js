import { z } from 'zod';
import { apiObject } from '#/core';
import { LikeSchema } from './like';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const FooterLikeUsersSchema = apiObject({
  results: z.array(LikeSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FooterLikeUsers = z.infer<typeof FooterLikeUsersSchema>;
