import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkTransitionDecodedPermissionSchema } from './bulkTransitionDecodedPermission';

export const BulkTransitionCombinationEntrySchema = apiObject({
  /**
   * The opaque id identifying this unique combination of space permissions. Pass directly to the bulk
   * role-assignments or access-removals endpoints.
   */
  combinationId: z.string(),
  /** Number of spaces that currently have this combination. */
  spaceCount: z.number(),
  /** Number of principals (users / groups / etc.) that currently have this combination. */
  principalCount: z.number(),
  /** The decoded space permissions that make up this combination. */
  permissions: z.array(BulkTransitionDecodedPermissionSchema),
  /**
   * The principal types that currently hold this combination and can be reassigned via the bulk role-assignments
   * endpoint. Use this to know which `principalType` entries are valid to include in the bulk-assign request for this
   * combination.
   */
  principalTypes: z.array(
    z.enum([
      'USER',
      'GROUP',
      'GUEST',
      'ANONYMOUS',
      'ALL_LICENSED_USERS_USER_CLASS',
      'ALL_PRODUCT_ADMINS_USER_CLASS',
      'APP',
      'TEAM',
    ]),
  ),
});

export type BulkTransitionCombinationEntry = z.infer<typeof BulkTransitionCombinationEntrySchema>;
