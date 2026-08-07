import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for labels. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const LabelSortOrderSchema = openEnum(['created-date', '-created-date', 'id', '-id', 'name', '-name']);

export type LabelSortOrder = z.infer<typeof LabelSortOrderSchema>;
