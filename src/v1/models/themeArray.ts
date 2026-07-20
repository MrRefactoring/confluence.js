import { z } from 'zod';
import { apiObject } from '#/core';
import { ThemeNoLinksSchema } from './themeNoLinks';
import { GenericLinksSchema } from './genericLinks';

export const ThemeArraySchema = apiObject({
  results: z.array(ThemeNoLinksSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type ThemeArray = z.infer<typeof ThemeArraySchema>;
