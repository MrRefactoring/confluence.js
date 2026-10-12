import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentArraySchema, type ContentArray, type ContentArrayInput } from './contentArray';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export interface ContentChildren {
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
    slide?: string;
  };
  _links?: GenericLinks;
  [key: string]: unknown;
}

export type ContentChildrenInput = unknown;

export const ContentChildrenSchema: z.ZodType<ContentChildren, ContentChildrenInput> = apiObject({
  attachment: (
    z.lazy((): z.ZodType<ContentArray, ContentArrayInput> => ContentArraySchema) as z.ZodType<
      ContentArray,
      ContentArrayInput
    >
  ).optional(),
  comment: (
    z.lazy((): z.ZodType<ContentArray, ContentArrayInput> => ContentArraySchema) as z.ZodType<
      ContentArray,
      ContentArrayInput
    >
  ).optional(),
  page: (
    z.lazy((): z.ZodType<ContentArray, ContentArrayInput> => ContentArraySchema) as z.ZodType<
      ContentArray,
      ContentArrayInput
    >
  ).optional(),
  whiteboard: (
    z.lazy((): z.ZodType<ContentArray, ContentArrayInput> => ContentArraySchema) as z.ZodType<
      ContentArray,
      ContentArrayInput
    >
  ).optional(),
  database: (
    z.lazy((): z.ZodType<ContentArray, ContentArrayInput> => ContentArraySchema) as z.ZodType<
      ContentArray,
      ContentArrayInput
    >
  ).optional(),
  embed: (
    z.lazy((): z.ZodType<ContentArray, ContentArrayInput> => ContentArraySchema) as z.ZodType<
      ContentArray,
      ContentArrayInput
    >
  ).optional(),
  folder: (
    z.lazy((): z.ZodType<ContentArray, ContentArrayInput> => ContentArraySchema) as z.ZodType<
      ContentArray,
      ContentArrayInput
    >
  ).optional(),
  _expandable: apiObject({
    attachment: z.string().optional(),
    comment: z.string().optional(),
    page: z.string().optional(),
    whiteboard: z.string().optional(),
    database: z.string().optional(),
    embed: z.string().optional(),
    folder: z.string().optional(),
    slide: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema.optional(),
});
