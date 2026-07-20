import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentSchema, type Content } from './content';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type ContentArray = {
  results: Content[];
  start?: number;
  limit?: number;
  size: number;
  _links: GenericLinks;
};

export const ContentArraySchema: z.ZodType<ContentArray> = apiObject({
  results: z.array(z.lazy(() => ContentSchema)),
  start: z.number().optional(),
  limit: z.number().optional(),
  size: z.number(),
  _links: GenericLinksSchema,
});
