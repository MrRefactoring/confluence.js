import { z } from 'zod';
import { apiObject } from '#/core';
import { SpacePermissionSchema } from './spacePermission';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const AvailableSpacePermissionsSchema = apiObject({
  results: z.array(SpacePermissionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AvailableSpacePermissions = z.infer<typeof AvailableSpacePermissionsSchema>;
