import { z } from 'zod';
import { apiObject } from '#/core';

export const PageLikeCountSchema = apiObject({
  /** The count number */
  count: z.number().optional(),
});

export type PageLikeCount = z.infer<typeof PageLikeCountSchema>;
