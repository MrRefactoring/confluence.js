import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomContentSummarySchema } from './customContentSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const CustomContentByTypeSchema = apiObject({
  results: z.array(CustomContentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentByType = z.infer<typeof CustomContentByTypeSchema>;
