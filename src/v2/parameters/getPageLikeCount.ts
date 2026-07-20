import { z } from 'zod';

export const GetPageLikeCountSchema = z.object({
  /** The ID of the page for which like count should be returned. */
  id: z.number(),
});

export type GetPageLikeCount = z.input<typeof GetPageLikeCountSchema>;
