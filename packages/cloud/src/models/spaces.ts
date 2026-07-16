import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { SpaceSummarySchema } from './spaceSummary.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const SpacesSchema = apiObject({
  results: z.array(SpaceSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type Spaces = z.infer<typeof SpacesSchema>;
