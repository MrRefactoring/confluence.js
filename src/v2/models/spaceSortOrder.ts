import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for spaces. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const SpaceSortOrderSchema = openEnum(['id', '-id', 'key', '-key', 'name', '-name']);

export type SpaceSortOrder = z.infer<typeof SpaceSortOrderSchema>;
