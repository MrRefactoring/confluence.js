import { z } from 'zod';
/**
 * The sort fields for labels. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const LabelSortOrderSchema = z.enum(['created-date', '-created-date', 'id', '-id', 'name', '-name']);

export type LabelSortOrder = z.infer<typeof LabelSortOrderSchema>;
