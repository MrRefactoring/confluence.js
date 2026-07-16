import { z } from 'zod';

export const GetFooterCommentVersionDetailsSchema = z.object({
  /** The ID of the footer comment for which version details should be returned. */
  id: z.number(),
  /** The version number of the footer comment to be returned. */
  versionNumber: z.number(),
});

export type GetFooterCommentVersionDetails = z.input<typeof GetFooterCommentVersionDetailsSchema>;
