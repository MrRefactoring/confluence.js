import { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentSummarySchema } from './attachmentSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const LabelAttachmentsSchema = apiObject({
  results: z.array(AttachmentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type LabelAttachments = z.infer<typeof LabelAttachmentsSchema>;
