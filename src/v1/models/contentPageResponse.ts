import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentSchema, type Content, type ContentInput } from './content';

export const ContentPageResponseSchema = apiObject({
  results: z.array(ContentSchema as z.ZodType<Content, ContentInput>),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
});

export type ContentPageResponse = z.infer<typeof ContentPageResponseSchema>;
