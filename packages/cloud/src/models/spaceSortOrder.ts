import { z } from 'zod';
/**
 * The sort fields for spaces. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const SpaceSortOrderSchema = z.enum(['id', '-id', 'key', '-key', 'name', '-name']);

export type SpaceSortOrder = z.infer<typeof SpaceSortOrderSchema>;
