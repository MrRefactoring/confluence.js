import { z } from 'zod';
import { apiObject } from '#/core';
/** Required for copying page in the same space. */

export const CopyPageHierarchyTitleOptionsSchema = apiObject({
  prefix: z.string().optional(),
  replace: z.string().optional(),
  search: z.string().optional(),
});

export type CopyPageHierarchyTitleOptions = z.infer<typeof CopyPageHierarchyTitleOptionsSchema>;
