import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomContentSummarySchema } from './customContentSummary';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const CustomContentByTypeInPageSchema = apiObject({
  results: z.array(CustomContentSummarySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentByTypeInPage = z.infer<typeof CustomContentByTypeInPageSchema>;
