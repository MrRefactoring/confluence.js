import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentPropertySchema } from './contentProperty';
import { GenericLinksSchema } from './genericLinks';

export const ContentPropertyArraySchema = apiObject({
  results: z.array(ContentPropertySchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type ContentPropertyArray = z.infer<typeof ContentPropertyArraySchema>;
