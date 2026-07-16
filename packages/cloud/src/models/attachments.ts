import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AttachmentSummarySchema } from './attachmentSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const AttachmentsSchema = apiObject({
  results: z.array(AttachmentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type Attachments = z.infer<typeof AttachmentsSchema>;
