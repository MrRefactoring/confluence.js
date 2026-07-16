import { z } from 'zod';
import { apiObject } from '#/core';
import { CommentBodyWriteSchema } from './commentBodyWrite';
import { CommentNestedBodyWriteSchema } from './commentNestedBodyWrite';

export const UpdateInlineCommentModelSchema = apiObject({
  version: apiObject({
    /** Number of new version. Should be 1 higher than current version of the comment. */
    number: z.number().optional(),
    /** Optional message store for the new version. */
    message: z.string().optional(),
  }).optional(),
  body: z.union([CommentBodyWriteSchema, CommentNestedBodyWriteSchema]).optional(),
  /**
   * Resolved state of the comment. Set to true to resolve the comment, set to false to reopen it. If matching the
   * existing state (i.e. true -> resolved or false -> open/reopened) , no change will occur. A dangling comment
   * cannot be updated.
   */
  resolved: z.boolean().optional(),
});

export type UpdateInlineCommentModel = z.infer<typeof UpdateInlineCommentModelSchema>;
