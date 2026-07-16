import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { BodySummarySchema } from './bodySummary';
import { CommentLinksSchema } from './commentLinks';

export const ChildrenCommentSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the parent comment the child comment is in. */
  parentCommentId: z.string().optional(),
  version: VersionSchema.optional(),
  body: BodySummarySchema.optional(),
  _links: CommentLinksSchema.optional(),
});

export type ChildrenComment = z.infer<typeof ChildrenCommentSchema>;
