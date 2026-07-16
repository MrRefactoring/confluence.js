import { z } from 'zod';
/**
 * The sort fields for child pages. The default sort direction is ascending by child-position. To sort in descending
 * order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const ChildPageSortOrderSchema = z.enum([
  'created-date',
  '-created-date',
  'id',
  '-id',
  'child-position',
  '-child-position',
  'modified-date',
  '-modified-date',
]);

export type ChildPageSortOrder = z.infer<typeof ChildPageSortOrderSchema>;
