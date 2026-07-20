import { z } from 'zod';
import { apiObject } from '#/core';
import { LabelSchema } from './label';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SpaceContentLabelsSchema = apiObject({
  results: z.array(LabelSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceContentLabels = z.infer<typeof SpaceContentLabelsSchema>;
