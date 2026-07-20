import { z } from 'zod';
/**
 * The sort fields for content properties. The default sort direction is ascending. To sort in descending order, append
 * a `-` character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const ContentPropertySortOrderSchema = z.enum(['key', '-key']);

export type ContentPropertySortOrder = z.infer<typeof ContentPropertySortOrderSchema>;
