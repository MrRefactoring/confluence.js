import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AttachmentSummarySchema } from './attachmentSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const LabelAttachmentsSchema = apiObject({
  results: z.array(AttachmentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type LabelAttachments = z.infer<typeof LabelAttachmentsSchema>;
