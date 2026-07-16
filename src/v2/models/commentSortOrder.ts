import { z } from 'zod';
/**
 * The sort fields for comments. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const CommentSortOrderSchema = z.enum(['created-date', '-created-date', 'modified-date', '-modified-date']);

export type CommentSortOrder = z.infer<typeof CommentSortOrderSchema>;
