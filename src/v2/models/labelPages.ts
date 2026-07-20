import { z } from 'zod';
import { apiObject } from '#/core';
import { PageSummarySchema } from './pageSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const LabelPagesSchema = apiObject({
  results: z.array(PageSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type LabelPages = z.infer<typeof LabelPagesSchema>;
