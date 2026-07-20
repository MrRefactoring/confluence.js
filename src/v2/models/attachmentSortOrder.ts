import { z } from 'zod';
/**
 * The sort fields for attachments. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const AttachmentSortOrderSchema = z.enum(['created-date', '-created-date', 'modified-date', '-modified-date']);

export type AttachmentSortOrder = z.infer<typeof AttachmentSortOrderSchema>;
