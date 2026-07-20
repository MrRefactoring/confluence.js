import { z } from 'zod';

export const LabeledContentTypeSchema = z.enum(['page', 'blogpost', 'attachment', 'page_template']);

export type LabeledContentType = z.infer<typeof LabeledContentTypeSchema>;
