import { z } from 'zod';
/**
 * The sort fields for child custom content. The default sort direction is ascending by id. To sort in descending order,
 * append a `-` character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const ChildCustomContentSortOrderSchema = z.enum([
  'created-date',
  '-created-date',
  'id',
  '-id',
  'modified-date',
  '-modified-date',
]);

export type ChildCustomContentSortOrder = z.infer<typeof ChildCustomContentSortOrderSchema>;
