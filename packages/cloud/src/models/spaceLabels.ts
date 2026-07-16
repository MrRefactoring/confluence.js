import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { LabelSchema } from './label.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const SpaceLabelsSchema = apiObject({
  results: z.array(LabelSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceLabels = z.infer<typeof SpaceLabelsSchema>;
