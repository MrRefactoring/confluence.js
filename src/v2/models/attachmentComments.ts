import { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentCommentSchema } from './attachmentComment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const AttachmentCommentsSchema = apiObject({
  results: z.array(AttachmentCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AttachmentComments = z.infer<typeof AttachmentCommentsSchema>;
