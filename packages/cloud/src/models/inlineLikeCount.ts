import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const InlineLikeCountSchema = apiObject({
  /** The count number */
  count: z.number().optional(),
});

export type InlineLikeCount = z.infer<typeof InlineLikeCountSchema>;
