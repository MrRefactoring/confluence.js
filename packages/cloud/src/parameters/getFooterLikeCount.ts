import { z } from 'zod';

export const GetFooterLikeCountSchema = z.object({
  /** The ID of the footer comment for which like count should be returned. */
  id: z.number(),
});

export type GetFooterLikeCount = z.input<typeof GetFooterLikeCountSchema>;
