import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { CommentBodyWriteSchema } from '#/models/commentBodyWrite';
import { CommentNestedBodyWriteSchema } from '#/models/commentNestedBodyWrite';

export const UpdateFooterCommentModelSchema = apiObject({
  version: apiObject({
    /** Number of new version. Should be 1 higher than current version of the comment. */
    number: z.number().optional(),
    /** Optional message store for the new version. */
    message: z.string().optional(),
  }).nullish(),
  body: z.union([CommentBodyWriteSchema, CommentNestedBodyWriteSchema]).nullish(),
});

export type UpdateFooterCommentModel = z.infer<typeof UpdateFooterCommentModelSchema>;
