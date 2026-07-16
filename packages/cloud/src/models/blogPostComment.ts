import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { VersionSchema } from '#/models/version';
import { BodySummarySchema } from '#/models/bodySummary';
import { CommentLinksSchema } from '#/models/commentLinks';

export const BlogPostCommentSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the blog post the comment is in. */
  blogPostId: z.string().optional(),
  version: VersionSchema.nullish(),
  body: BodySummarySchema.nullish(),
  _links: CommentLinksSchema.nullish(),
});

export type BlogPostComment = z.infer<typeof BlogPostCommentSchema>;
