import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { LabelSchema } from './label';
import { OptionalFieldMetaSchema } from './optionalFieldMeta';
import { OptionalFieldLinksSchema } from './optionalFieldLinks';
import { ContentPropertySchema } from './contentProperty';
import { OperationSchema } from './operation';
import { AttachmentLinksSchema } from './attachmentLinks';

export const AttachmentSchema = apiObject({
  /** ID of the attachment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** Date and time when the attachment was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /**
   * ID of the containing page.
   *
   * Note: This is only returned if the attachment has a container that is a page.
   */
  pageId: z.string().optional(),
  /**
   * ID of the containing blog post.
   *
   * Note: This is only returned if the attachment has a container that is a blog post.
   */
  blogPostId: z.string().optional(),
  /**
   * ID of the containing custom content.
   *
   * Note: This is only returned if the attachment has a container that is custom content.
   */
  customContentId: z.string().optional(),
  /** Media Type for the attachment. */
  mediaType: z.string().optional(),
  /** Media Type description for the attachment. */
  mediaTypeDescription: z.string().nullish(),
  /** Comment for the attachment. */
  comment: z.string().optional(),
  /**
   * File ID of the attachment. This is the ID referenced in `atlas_doc_format` bodies and is distinct from the
   * attachment ID.
   */
  fileId: z.string().optional(),
  /** File size of the attachment. */
  fileSize: z.number().optional(),
  /** WebUI link of the attachment. */
  webuiLink: z.string().optional(),
  /** Download link of the attachment. */
  downloadLink: z.string().optional(),
  version: VersionSchema.nullish(),
  labels: apiObject({
    results: z.array(LabelSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
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
  versions: apiObject({
    results: z.array(VersionSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  _links: AttachmentLinksSchema.nullish(),
});

export type Attachment = z.infer<typeof AttachmentSchema>;
