import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentSchema } from './content';

export const ContentPageResponseSchema = apiObject({
  results: z.array(ContentSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
});

export type ContentPageResponse = z.infer<typeof ContentPageResponseSchema>;
