import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkTransitionDecodedPermissionSchema = apiObject({
  /** The platform id of the permission (e.g. `VIEW_CONTENT`). */
  id: z.string(),
  /** Human-readable name of the permission. */
  displayName: z.string(),
});

export type BulkTransitionDecodedPermission = z.infer<typeof BulkTransitionDecodedPermissionSchema>;
