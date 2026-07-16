import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { BodySchema } from './body';
import { InlineCommentResolutionStatusSchema } from './inlineCommentResolutionStatus';
import { ContentPropertySchema } from './contentProperty';
import { OptionalFieldMetaSchema } from './optionalFieldMeta';
import { OptionalFieldLinksSchema } from './optionalFieldLinks';
import { OperationSchema } from './operation';
import { LikeSchema } from './like';
import { CommentLinksSchema } from './commentLinks';

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
  version: VersionSchema.optional(),
  body: BodySchema.optional(),
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
    results: z.array(ContentPropertySchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
    /** Property value used to reference the highlighted element in DOM. */
    inlineMarkerRef: z.string().optional(),
    /** Text that is highlighted. */
    inlineOriginalSelection: z.string().optional(),
  }).optional(),
  operations: apiObject({
    results: z.array(OperationSchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  likes: apiObject({
    results: z.array(LikeSchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  versions: apiObject({
    results: z.array(VersionSchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  _links: CommentLinksSchema.optional(),
});

export type InlineComment = z.infer<typeof InlineCommentSchema>;
