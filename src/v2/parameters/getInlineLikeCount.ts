import { z } from 'zod';

export const GetInlineLikeCountSchema = z.object({
  /** The ID of the inline comment for which like count should be returned. */
  id: z.number(),
});

export type GetInlineLikeCount = z.input<typeof GetInlineLikeCountSchema>;
