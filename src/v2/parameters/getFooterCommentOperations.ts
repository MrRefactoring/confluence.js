import { z } from 'zod';

export const GetFooterCommentOperationsSchema = z.object({
  /** The ID of the footer comment for which operations should be returned. */
  id: z.number(),
});

export type GetFooterCommentOperations = z.input<typeof GetFooterCommentOperationsSchema>;
