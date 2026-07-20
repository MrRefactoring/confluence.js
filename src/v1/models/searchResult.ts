import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentSchema } from './content';
import { UserSchema } from './user';
import { SpaceSchema } from './space';
import { ContainerSummarySchema } from './containerSummary';
import { BreadcrumbSchema } from './breadcrumb';

export const SearchResultSchema = apiObject({
  content: ContentSchema.optional(),
  user: UserSchema.optional(),
  space: SpaceSchema.optional(),
  title: z.string(),
  excerpt: z.string(),
  url: z.string(),
  resultParentContainer: ContainerSummarySchema.optional(),
  resultGlobalContainer: ContainerSummarySchema.optional(),
  breadcrumbs: z.array(BreadcrumbSchema),
  entityType: z.string(),
  iconCssClass: z.string(),
  lastModified: z.coerce.date(),
  friendlyLastModified: z.string().optional(),
  score: z.number().optional(),
});

export type SearchResult = z.infer<typeof SearchResultSchema>;
