import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { CommentBodyWriteSchema } from '#/models/commentBodyWrite';
import { CommentNestedBodyWriteSchema } from '#/models/commentNestedBodyWrite';

export const CreateFooterCommentModelSchema = apiObject({
  /**
   * ID of the containing blog post, if intending to create a top level footer comment. Do not provide if creating a
   * reply.
   */
  blogPostId: z.string().optional(),
  /** ID of the containing page, if intending to create a top level footer comment. Do not provide if creating a reply. */
  pageId: z.string().optional(),
  /** ID of the parent comment, if intending to create a reply. Do not provide if creating a top level comment. */
  parentCommentId: z.string().optional(),
  /** ID of the attachment, if intending to create a comment against an attachment. */
  attachmentId: z.string().optional(),
  /** ID of the custom content, if intending to create a comment against a custom content. */
  customContentId: z.string().optional(),
  body: z.union([CommentBodyWriteSchema, CommentNestedBodyWriteSchema]).nullish(),
});

export type CreateFooterCommentModel = z.infer<typeof CreateFooterCommentModelSchema>;
