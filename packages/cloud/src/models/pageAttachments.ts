import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AttachmentSummarySchema } from './attachmentSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const PageAttachmentsSchema = apiObject({
  results: z.array(AttachmentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageAttachments = z.infer<typeof PageAttachmentsSchema>;
