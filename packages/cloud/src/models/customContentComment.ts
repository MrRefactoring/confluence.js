import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { VersionSchema } from '#/models/version';
import { BodySchema } from '#/models/body';
import { CommentLinksSchema } from '#/models/commentLinks';

export const CustomContentCommentSchema = apiObject({
  /** ID of the comment. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the comment. */
  title: z.string().optional(),
  /** ID of the custom content containing the comment. */
  customContentId: z.string().optional(),
  version: VersionSchema.nullish(),
  body: BodySchema.nullish(),
  _links: CommentLinksSchema.nullish(),
});

export type CustomContentComment = z.infer<typeof CustomContentCommentSchema>;
