import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { BodySchema } from './body';
import { CommentLinksSchema } from './commentLinks';

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
