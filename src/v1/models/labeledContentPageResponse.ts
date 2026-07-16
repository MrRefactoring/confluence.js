import { z } from 'zod';
import { apiObject } from '#/core';
import { LabeledContentSchema } from './labeledContent';

export const LabeledContentPageResponseSchema = apiObject({
  results: z.array(LabeledContentSchema),
  start: z.number().optional(),
  limit: z.number().optional(),
  size: z.number(),
});

export type LabeledContentPageResponse = z.infer<typeof LabeledContentPageResponseSchema>;
