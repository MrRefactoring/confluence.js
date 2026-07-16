import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { PageSummarySchema } from './pageSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const PagesInSpaceSchema = apiObject({
  results: z.array(PageSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PagesInSpace = z.infer<typeof PagesInSpaceSchema>;
