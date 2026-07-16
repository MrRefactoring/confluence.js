import { z } from 'zod';

export const RemovePermissionSchema = z.object({
  /** The key of the space to be queried for its content. */
  spaceKey: z.string(),
  /** Id of the permission to be deleted. */
  id: z.number(),
});

export type RemovePermission = z.input<typeof RemovePermissionSchema>;
