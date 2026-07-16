import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BulkTransitionSpaceSelectionSchema } from '#/models/bulkTransitionSpaceSelection';

export const BulkRemoveAccessSchema = apiObject({
  /** List of permission combination IDs to remove access for. */
  permissionCombinationIds: z.array(z.string()),
  spaceSelection: BulkTransitionSpaceSelectionSchema,
});

export type BulkRemoveAccess = z.infer<typeof BulkRemoveAccessSchema>;
