import { z } from 'zod';

export const GetInlineCommentVersionDetailsSchema = z.object({
  /** The ID of the inline comment for which version details should be returned. */
  id: z.number(),
  /** The version number of the inline comment to be returned. */
  versionNumber: z.number(),
});

export type GetInlineCommentVersionDetails = z.input<typeof GetInlineCommentVersionDetailsSchema>;
