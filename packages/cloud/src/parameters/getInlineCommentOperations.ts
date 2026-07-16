import { z } from 'zod';

export const GetInlineCommentOperationsSchema = z.object({
  /** The ID of the inline comment for which operations should be returned. */
  id: z.number(),
});

export type GetInlineCommentOperations = z.input<typeof GetInlineCommentOperationsSchema>;
