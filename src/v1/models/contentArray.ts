import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentSchema, type Content, type ContentInput } from './content';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export interface ContentArray {
  results: Content[];
  start?: number;
  limit?: number;
  size: number;
  _links: GenericLinks;
  [key: string]: unknown;
}

export type ContentArrayInput = unknown;

export const ContentArraySchema: z.ZodType<ContentArray, ContentArrayInput> = apiObject({
  results: z.array(z.lazy((): z.ZodType<Content, ContentInput> => ContentSchema) as z.ZodType<Content, ContentInput>),
  start: z.number().optional(),
  limit: z.number().optional(),
  size: z.number(),
  _links: GenericLinksSchema,
});
