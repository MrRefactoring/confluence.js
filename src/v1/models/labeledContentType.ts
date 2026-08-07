import type { z } from 'zod';
import { openEnum } from '#/core';

export const LabeledContentTypeSchema = openEnum(['page', 'blogpost', 'attachment', 'page_template']);

export type LabeledContentType = z.infer<typeof LabeledContentTypeSchema>;
