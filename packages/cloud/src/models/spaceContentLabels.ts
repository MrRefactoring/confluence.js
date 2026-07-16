import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { LabelSchema } from './label.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const SpaceContentLabelsSchema = apiObject({
  results: z.array(LabelSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceContentLabels = z.infer<typeof SpaceContentLabelsSchema>;
