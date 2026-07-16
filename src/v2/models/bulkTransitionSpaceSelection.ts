import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkTransitionSpaceTargetSchema } from './bulkTransitionSpaceTarget';

export const BulkTransitionSpaceSelectionSchema = apiObject({
  /** The space selection type. */
  spaceType: z.enum(['ALL', 'ALL_EXCEPT_PERSONAL', 'ALL_EXCEPT_SPECIFIC', 'PERSONAL', 'SPECIFIC']),
  /** List of specific spaces. Required when spaceType is SPECIFIC or ALL_EXCEPT_SPECIFIC. */
  selectedSpaces: z.array(BulkTransitionSpaceTargetSchema).nullish(),
});

export type BulkTransitionSpaceSelection = z.infer<typeof BulkTransitionSpaceSelectionSchema>;
