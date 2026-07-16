import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { VersionSchema } from '#/models/version';
import { BodySummarySchema } from '#/models/bodySummary';
import { InlineCommentResolutionStatusSchema } from '#/models/inlineCommentResolutionStatus';
import { InlineCommentPropertiesSchema } from '#/models/inlineCommentProperties';
import { CommentLinksSchema } from '#/models/commentLinks';

export const PageInlineCommentSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the page the comment is in. */
  pageId: z.string().optional(),
  version: VersionSchema.nullish(),
  body: BodySummarySchema.nullish(),
  resolutionStatus: InlineCommentResolutionStatusSchema.optional(),
  properties: InlineCommentPropertiesSchema.nullish(),
  _links: CommentLinksSchema.nullish(),
});

export type PageInlineComment = z.infer<typeof PageInlineCommentSchema>;
