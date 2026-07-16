import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';
import { GenericLinksSchema } from './genericLinks';

export const ThemeSchema = apiObject({
  themeKey: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  icon: IconSchema.optional(),
  _links: GenericLinksSchema.optional(),
});

export type Theme = z.infer<typeof ThemeSchema>;
