import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { VersionSchema } from '#/models/version';
import { BodySummarySchema } from '#/models/bodySummary';
import { CommentLinksSchema } from '#/models/commentLinks';

export const ChildrenCommentSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the parent comment the child comment is in. */
  parentCommentId: z.string().optional(),
  version: VersionSchema.nullish(),
  body: BodySummarySchema.nullish(),
  _links: CommentLinksSchema.nullish(),
});

export type ChildrenComment = z.infer<typeof ChildrenCommentSchema>;
