import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const FooterLikeCountSchema = apiObject({
  /** The count number */
  count: z.number().optional(),
});

export type FooterLikeCount = z.infer<typeof FooterLikeCountSchema>;
