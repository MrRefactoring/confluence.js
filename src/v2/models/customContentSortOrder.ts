import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for custom content. The default sort direction is ascending. To sort in descending order, append a
 * `-` character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const CustomContentSortOrderSchema = openEnum([
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
