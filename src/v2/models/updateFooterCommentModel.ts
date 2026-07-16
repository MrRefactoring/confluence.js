import { z } from 'zod';
import { apiObject } from '#/core';
import { CommentBodyWriteSchema } from './commentBodyWrite';
import { CommentNestedBodyWriteSchema } from './commentNestedBodyWrite';

export const UpdateFooterCommentModelSchema = apiObject({
  version: apiObject({
    /** Number of new version. Should be 1 higher than current version of the comment. */
    number: z.number().optional(),
    /** Optional message store for the new version. */
    message: z.string().optional(),
  }).optional(),
  body: z.union([CommentBodyWriteSchema, CommentNestedBodyWriteSchema]).optional(),
});

export type UpdateFooterCommentModel = z.infer<typeof UpdateFooterCommentModelSchema>;
