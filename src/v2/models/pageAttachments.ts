import { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentSummarySchema } from './attachmentSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const PageAttachmentsSchema = apiObject({
  results: z.array(AttachmentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageAttachments = z.infer<typeof PageAttachmentsSchema>;
