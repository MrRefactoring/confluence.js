import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for content properties. The default sort direction is ascending. To sort in descending order, append
 * a `-` character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const ContentPropertySortOrderSchema = openEnum(['key', '-key']);

export type ContentPropertySortOrder = z.infer<typeof ContentPropertySortOrderSchema>;
