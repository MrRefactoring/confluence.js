import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { PageSummarySchema } from './pageSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const LabelPagesSchema = apiObject({
  results: z.array(PageSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type LabelPages = z.infer<typeof LabelPagesSchema>;
