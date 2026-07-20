import { z } from 'zod';
import { apiObject } from '#/core';
import { LabelSchema } from './label';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const AttachmentLabelsSchema = apiObject({
  results: z.array(LabelSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AttachmentLabels = z.infer<typeof AttachmentLabelsSchema>;
