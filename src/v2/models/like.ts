import { z } from 'zod';
import { apiObject } from '#/core';

export const LikeSchema = apiObject({
  /** Account ID. */
  accountId: z.string().optional(),
});

export type Like = z.infer<typeof LikeSchema>;
