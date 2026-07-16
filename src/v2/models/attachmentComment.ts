import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { BodySchema } from './body';
import { CommentLinksSchema } from './commentLinks';

export const AttachmentCommentSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the attachment containing the comment. */
  attachmentId: z.string().optional(),
  version: VersionSchema.nullish(),
  body: BodySchema.nullish(),
  _links: CommentLinksSchema.nullish(),
});

export type AttachmentComment = z.infer<typeof AttachmentCommentSchema>;
