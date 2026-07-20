import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentTemplateSchema } from './contentTemplate';
import { GenericLinksSchema } from './genericLinks';

export const ContentTemplateArraySchema = apiObject({
  results: z.array(ContentTemplateSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type ContentTemplateArray = z.infer<typeof ContentTemplateArraySchema>;
