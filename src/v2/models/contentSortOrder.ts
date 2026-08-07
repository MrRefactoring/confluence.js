import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for hierarchical content types. The default sort direction is ascending. To sort in descending order,
 * append a `-` character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const ContentSortOrderSchema = openEnum([
  'created-date',
  '-created-date',
  'id',
  '-id',
  'modified-date',
  '-modified-date',
  'child-position',
  '-child-position',
  'title',
  '-title',
]);

export type ContentSortOrder = z.infer<typeof ContentSortOrderSchema>;
