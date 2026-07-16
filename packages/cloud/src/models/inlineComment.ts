import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { VersionSchema } from '#/models/version';
import { BodySchema } from '#/models/body';
import { InlineCommentResolutionStatusSchema } from '#/models/inlineCommentResolutionStatus';
import { ContentPropertySchema } from '#/models/contentProperty';
import { OptionalFieldMetaSchema } from '#/models/optionalFieldMeta';
import { OptionalFieldLinksSchema } from '#/models/optionalFieldLinks';
import { OperationSchema } from '#/models/operation';
import { LikeSchema } from '#/models/like';
import { CommentLinksSchema } from '#/models/commentLinks';

export const InlineCommentSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the blog post containing the comment if the comment is on a blog post. */
  blogPostId: z.string().optional(),
  /** ID of the page containing the comment if the comment is on a page. */
  pageId: z.string().optional(),
  /** ID of the parent comment if the comment is a reply. */
  parentCommentId: z.string().optional(),
  version: VersionSchema.nullish(),
  body: BodySchema.nullish(),
  /**
   * Atlassian Account ID of last person who modified the resolve state of the comment. Null until comment is resolved
   * or reopened.
   */
  resolutionLastModifierId: z.string().optional(),
  /**
   * Timestamp of the last modification to the comment's resolution status. Null until comment is resolved or
   * reopened.
   */
  resolutionLastModifiedAt: z.coerce.date().optional(),
  resolutionStatus: InlineCommentResolutionStatusSchema.optional(),
  properties: apiObject({
    results: z.array(ContentPropertySchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
    /** Property value used to reference the highlighted element in DOM. */
    inlineMarkerRef: z.string().optional(),
    /** Text that is highlighted. */
    inlineOriginalSelection: z.string().optional(),
  }).nullish(),
  operations: apiObject({
    results: z.array(OperationSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  likes: apiObject({
    results: z.array(LikeSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  versions: apiObject({
    results: z.array(VersionSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  _links: CommentLinksSchema.nullish(),
});

export type InlineComment = z.infer<typeof InlineCommentSchema>;
