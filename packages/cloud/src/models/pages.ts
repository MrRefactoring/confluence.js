import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { PageSummarySchema } from './pageSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const PagesSchema = apiObject({
  results: z.array(PageSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type Pages = z.infer<typeof PagesSchema>;
