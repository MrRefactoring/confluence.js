import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { CommentBodyWriteSchema } from '#/models/commentBodyWrite';
import { CommentNestedBodyWriteSchema } from '#/models/commentNestedBodyWrite';

export const CreateInlineCommentModelSchema = apiObject({
  /**
   * ID of the containing blog post, if intending to create a top level footer comment. Do not provide if creating a
   * reply.
   */
  blogPostId: z.string().optional(),
  /** ID of the containing page, if intending to create a top level footer comment. Do not provide if creating a reply. */
  pageId: z.string().optional(),
  /** ID of the parent comment, if intending to create a reply. Do not provide if creating a top level comment. */
  parentCommentId: z.string().optional(),
  body: z.union([CommentBodyWriteSchema, CommentNestedBodyWriteSchema]).nullish(),
  /**
   * Object describing the text to highlight on the page/blog post. Only applicable for top level inline comments (not
   * replies) and required in that case.
   */
  inlineCommentProperties: apiObject({
    /** The text to highlight */
    textSelection: z.string().optional(),
    /**
     * The number of matches for the selected text on the page (should be strictly greater than
     * textSelectionMatchIndex)
     */
    textSelectionMatchCount: z.number().optional(),
    /**
     * The match index to highlight. This is zero-based. E.g. if you have 3 occurrences of "hello world" on a page
     * and you want to highlight the second occurrence, you should pass 1 for textSelectionMatchIndex and 3 for
     * textSelectionMatchCount.
     */
    textSelectionMatchIndex: z.number().optional(),
  }).nullish(),
});

export type CreateInlineCommentModel = z.infer<typeof CreateInlineCommentModelSchema>;
