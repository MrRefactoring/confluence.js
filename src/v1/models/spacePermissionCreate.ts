import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
import { GroupCreateSchema } from './groupCreate';
import { OperationCheckResultSchema } from './operationCheckResult';
/**
 * This object represents a permission for given space. Permissions consist of* at least one operation object with an
 * accompanying subjects object.*
 *
 * The following combinations of `operation` and `targetType` values are* valid for the `operation` object:*
 *
 * - 'create': 'page', 'blogpost', 'comment', 'attachment'*
 * - 'read': 'space'*
 * - 'delete': 'page', 'blogpost', 'comment', 'attachment'*
 * - 'export': 'space'*
 * - 'administer': 'space'
 */

export const SpacePermissionCreateSchema = apiObject({
  /** The users and/or groups that the permission applies to. */
  subjects: apiObject({
    user: apiObject({
      results: z.array(UserSchema),
      size: z.number(),
    }).optional(),
    group: apiObject({
      results: z.array(GroupCreateSchema),
      size: z.number(),
    }).optional(),
  }).optional(),
  operation: OperationCheckResultSchema,
  /** Grant anonymous users permission to use the operation. */
  anonymousAccess: z.boolean(),
  /** Grants access to unlicensed users from JIRA Service Desk when used with the 'read space' operation. */
  unlicensedAccess: z.boolean(),
});

export type SpacePermissionCreate = z.infer<typeof SpacePermissionCreateSchema>;
