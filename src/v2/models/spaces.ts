import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceSummarySchema } from './spaceSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SpacesSchema = apiObject({
  results: z.array(SpaceSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type Spaces = z.infer<typeof SpacesSchema>;
