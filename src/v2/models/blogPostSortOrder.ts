import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for blog posts. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const BlogPostSortOrderSchema = openEnum([
  'id',
  '-id',
  'created-date',
  '-created-date',
  'modified-date',
  '-modified-date',
]);

export type BlogPostSortOrder = z.infer<typeof BlogPostSortOrderSchema>;
