import { z } from 'zod';
/**
 * The sort fields for pages. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const PageSortOrderSchema = z.enum([
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
