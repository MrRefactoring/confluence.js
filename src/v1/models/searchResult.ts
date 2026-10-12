import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentSchema, type Content, type ContentInput } from './content';
import { UserSchema, type User, type UserInput } from './user';
import { SpaceSchema, type Space, type SpaceInput } from './space';
import { ContainerSummarySchema } from './containerSummary';
import { BreadcrumbSchema } from './breadcrumb';

export const SearchResultSchema = apiObject({
  content: (ContentSchema as z.ZodType<Content, ContentInput>).optional(),
  user: (UserSchema as z.ZodType<User, UserInput>).optional(),
  space: (SpaceSchema as z.ZodType<Space, SpaceInput>).optional(),
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
