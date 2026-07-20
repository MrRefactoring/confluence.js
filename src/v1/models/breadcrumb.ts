import { z } from 'zod';
import { apiObject } from '#/core';

export const BreadcrumbSchema = apiObject({
  label: z.string(),
  url: z.string(),
  separator: z.string(),
});

export type Breadcrumb = z.infer<typeof BreadcrumbSchema>;
