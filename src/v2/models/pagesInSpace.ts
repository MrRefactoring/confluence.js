import { z } from 'zod';
import { apiObject } from '#/core';
import { PageSummarySchema } from './pageSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const PagesInSpaceSchema = apiObject({
  results: z.array(PageSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PagesInSpace = z.infer<typeof PagesInSpaceSchema>;
