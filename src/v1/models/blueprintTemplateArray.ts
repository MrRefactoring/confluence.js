import { z } from 'zod';
import { apiObject } from '#/core';
import { BlueprintTemplateSchema } from './blueprintTemplate';
import { GenericLinksSchema } from './genericLinks';

export const BlueprintTemplateArraySchema = apiObject({
  results: z.array(BlueprintTemplateSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type BlueprintTemplateArray = z.infer<typeof BlueprintTemplateArraySchema>;
