import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for pages. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const PageSortOrderSchema = openEnum([
  'id',
  '-id',
  'created-date',
  '-created-date',
  'modified-date',
  '-modified-date',
  'title',
  '-title',
]);

export type PageSortOrder = z.infer<typeof PageSortOrderSchema>;
