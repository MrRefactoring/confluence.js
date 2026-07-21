import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { BodySummarySchema } from './bodySummary';
import { InlineCommentResolutionStatusSchema } from './inlineCommentResolutionStatus';
import { InlineCommentPropertiesSchema } from './inlineCommentProperties';
import { CommentLinksSchema } from './commentLinks';

export const InlineCommentChildrenSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the parent comment the child comment is in. */
  parentCommentId: z.string().optional(),
  version: VersionSchema.nullish(),
  body: BodySummarySchema.nullish(),
  resolutionStatus: InlineCommentResolutionStatusSchema.optional(),
  properties: InlineCommentPropertiesSchema.nullish(),
  _links: CommentLinksSchema.nullish(),
  pageId: z.string().optional(),
});

export type InlineCommentChildren = z.infer<typeof InlineCommentChildrenSchema>;
