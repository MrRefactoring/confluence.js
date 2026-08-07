import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for comments. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const CommentSortOrderSchema = openEnum(['created-date', '-created-date', 'modified-date', '-modified-date']);

export type CommentSortOrder = z.infer<typeof CommentSortOrderSchema>;
