import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkTransitionCombinationEntrySchema } from './bulkTransitionCombinationEntry';

export const ListSpacePermissionCombinationsResponseSchema = apiObject({
  /** One page of unassigned permission combinations, sorted by principalCount descending. */
  results: z.array(BulkTransitionCombinationEntrySchema),
  /**
   * ISO-8601 timestamp of the last audit run that populated the combinations table. Absent if the audit task has
   * never run on this tenant.
   */
  generatedAt: z.string().nullish(),
  /** Opaque cursor for the next page. Absent when no further results exist. */
  cursor: z.string().nullish(),
});

export type ListSpacePermissionCombinationsResponse = z.infer<typeof ListSpacePermissionCombinationsResponseSchema>;
