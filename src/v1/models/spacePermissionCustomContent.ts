import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionSubjectSchema } from './permissionSubject';
/**
 * This object represents a list of space permissions for custom content type for an individual user. Permissions
 * consist of* a subjects object and a list with at least one operation object.
 */

export const SpacePermissionCustomContentSchema = apiObject({
  subject: PermissionSubjectSchema,
  operations: z.array(
    apiObject({
      /** The operation type */
      key: z.enum(['read', 'create', 'delete']),
      /** The custom content type */
      target: z.string(),
      /** Grant or restrict access */
      access: z.boolean(),
    }),
  ),
});

export type SpacePermissionCustomContent = z.infer<typeof SpacePermissionCustomContentSchema>;
