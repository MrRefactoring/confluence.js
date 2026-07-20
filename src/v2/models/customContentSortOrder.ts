import { z } from 'zod';
/**
 * The sort fields for custom content. The default sort direction is ascending. To sort in descending order, append a
 * `-` character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const CustomContentSortOrderSchema = z.enum([
  'id',
  '-id',
  'created-date',
  '-created-date',
  'modified-date',
  '-modified-date',
  'title',
  '-title',
]);

export type CustomContentSortOrder = z.infer<typeof CustomContentSortOrderSchema>;
