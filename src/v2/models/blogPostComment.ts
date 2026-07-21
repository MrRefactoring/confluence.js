import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { BodySummarySchema } from './bodySummary';
import { CommentLinksSchema } from './commentLinks';

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
  resolutionStatus: z.string().optional(),
});

export type BlogPostComment = z.infer<typeof BlogPostCommentSchema>;
