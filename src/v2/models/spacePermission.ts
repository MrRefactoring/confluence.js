import { z } from 'zod';
import { apiObject } from '#/core';

export const SpacePermissionSchema = apiObject({
  /** The identifier for the space permission. */
  id: z.string().optional(),
  /** The display name for the space permission. */
  displayName: z.string().optional(),
  /** Describes the space permission’s usage. */
  description: z.string().optional(),
  /** The permissions required for this permission to be enabled. */
  requiredPermissionIds: z.array(z.string()).nullish(),
});

export type SpacePermission = z.infer<typeof SpacePermissionSchema>;
