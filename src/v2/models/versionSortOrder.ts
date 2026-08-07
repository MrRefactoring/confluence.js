import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The sort fields for versions. The default sort direction is ascending. To sort in descending order, append a `-`
 * character before the sort field. For example, `fieldName` or `-fieldName`.
 */

export const VersionSortOrderSchema = openEnum(['modified-date', '-modified-date']);

export type VersionSortOrder = z.infer<typeof VersionSortOrderSchema>;
