import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const CommentBodyWriteSchema = apiObject({
  /** Type of content representation used for the value field. */
  representation: openEnum(['storage', 'atlas_doc_format', 'wiki']).optional(),
  /** Body of the comment, in the format found in the representation field. */
  value: z.string().optional(),
});

export type CommentBodyWrite = z.infer<typeof CommentBodyWriteSchema>;
