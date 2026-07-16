import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AttachmentSummarySchema } from './attachmentSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const CustomContentAttachmentsSchema = apiObject({
  results: z.array(AttachmentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentAttachments = z.infer<typeof CustomContentAttachmentsSchema>;
