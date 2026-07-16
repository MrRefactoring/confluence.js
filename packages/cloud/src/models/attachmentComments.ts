import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AttachmentCommentSchema } from './attachmentComment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const AttachmentCommentsSchema = apiObject({
  results: z.array(AttachmentCommentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AttachmentComments = z.infer<typeof AttachmentCommentsSchema>;
