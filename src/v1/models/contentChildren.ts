import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentArraySchema, type ContentArray } from './contentArray';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type ContentChildren = {
  attachment?: ContentArray;
  comment?: ContentArray;
  page?: ContentArray;
  whiteboard?: ContentArray;
  database?: ContentArray;
  embed?: ContentArray;
  folder?: ContentArray;
  _expandable?: {
    attachment?: string;
    comment?: string;
    page?: string;
    whiteboard?: string;
    database?: string;
    embed?: string;
    folder?: string;
  };
  _links?: GenericLinks;
};

export const ContentChildrenSchema: z.ZodType<ContentChildren> = apiObject({
  attachment: z.lazy(() => ContentArraySchema).optional(),
  comment: z.lazy(() => ContentArraySchema).optional(),
  page: z.lazy(() => ContentArraySchema).optional(),
  whiteboard: z.lazy(() => ContentArraySchema).optional(),
  database: z.lazy(() => ContentArraySchema).optional(),
  embed: z.lazy(() => ContentArraySchema).optional(),
  folder: z.lazy(() => ContentArraySchema).optional(),
  _expandable: apiObject({
    attachment: z.string().optional(),
    comment: z.string().optional(),
    page: z.string().optional(),
    whiteboard: z.string().optional(),
    database: z.string().optional(),
    embed: z.string().optional(),
    folder: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema.optional(),
});
