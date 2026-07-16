import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { LabelSchema } from './label.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const CustomContentLabelsSchema = apiObject({
  results: z.array(LabelSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentLabels = z.infer<typeof CustomContentLabelsSchema>;
