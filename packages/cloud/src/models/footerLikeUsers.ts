import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { LikeSchema } from './like.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const FooterLikeUsersSchema = apiObject({
  results: z.array(LikeSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FooterLikeUsers = z.infer<typeof FooterLikeUsersSchema>;
