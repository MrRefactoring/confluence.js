import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { SpacePermissionSchema } from './spacePermission.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const AvailableSpacePermissionsSchema = apiObject({
  results: z.array(SpacePermissionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AvailableSpacePermissions = z.infer<typeof AvailableSpacePermissionsSchema>;
