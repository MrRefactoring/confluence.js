import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { ContentPropertySchema } from './contentProperty';
import { OptionalFieldMetaSchema } from './optionalFieldMeta';
import { OptionalFieldLinksSchema } from './optionalFieldLinks';
import { OperationSchema } from './operation';
import { LikeSchema } from './like';
import { BodySchema } from './body';
import { CommentLinksSchema } from './commentLinks';

export const FooterCommentSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the blog post containing the comment if the comment is on a blog post. */
  blogPostId: z.string().optional(),
  /** ID of the page containing the comment if the comment is on a page. */
  pageId: z.string().optional(),
  /** ID of the attachment containing the comment if the comment is on an attachment. */
  attachmentId: z.string().optional(),
  /** ID of the custom content containing the comment if the comment is on a custom content. */
  customContentId: z.string().optional(),
  /** ID of the parent comment if the comment is a reply. */
  parentCommentId: z.string().optional(),
  version: VersionSchema.nullish(),
  properties: apiObject({
    results: z.array(ContentPropertySchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
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
  body: BodySchema.nullish(),
  _links: CommentLinksSchema.nullish(),
});

export type FooterComment = z.infer<typeof FooterCommentSchema>;
