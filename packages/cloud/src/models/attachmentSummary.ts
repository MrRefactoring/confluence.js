import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { VersionSchema } from '#/models/version';
import { AttachmentLinksSchema } from '#/models/attachmentLinks';

export const AttachmentSummarySchema = apiObject({
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
  _links: AttachmentLinksSchema.nullish(),
});

export type AttachmentSummary = z.infer<typeof AttachmentSummarySchema>;
