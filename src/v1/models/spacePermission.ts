import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema, type User, type UserInput } from './user';
import { GroupSchema, type Group } from './group';
import { OperationCheckResultSchema, type OperationCheckResult } from './operationCheckResult';

export interface SpacePermission {
  id?: number;
  /** The users and/or groups that the permission applies to. */
  subjects?: {
    user?: {
      results: User[];
      size: number;
      start?: number;
      limit?: number;
    };
    group?: {
      results: Group[];
      size: number;
      start?: number;
      limit?: number;
    };
    _expandable?: {
      user?: string;
      group?: string;
    };
  };
  operation: OperationCheckResult;
  /** Grant anonymous users permission to use the operation. */
  anonymousAccess: boolean;
  /** Grants access to unlicensed users from JIRA Service Desk when used with the 'read space' operation. */
  unlicensedAccess: boolean;
  [key: string]: unknown;
}

export type SpacePermissionInput = unknown;

/**
 * This object represents a permission for given space. Permissions consist of at least one operation object with an
 * accompanying subjects object.
 *
 * The following combinations of `operation` and `targetType` values are valid for the `operation` object:
 *
 * - 'create': 'page', 'blogpost', 'comment', 'attachment'
 * - 'read': 'space'
 * - 'delete': 'page', 'blogpost', 'comment', 'attachment'
 * - 'export': 'space'
 * - 'administer': 'space'
 */
export const SpacePermissionSchema: z.ZodType<SpacePermission, SpacePermissionInput> = apiObject({
  id: z.number().optional(),
  /** The users and/or groups that the permission applies to. */
  subjects: apiObject({
    user: apiObject({
      results: z.array(z.lazy((): z.ZodType<User, UserInput> => UserSchema) as z.ZodType<User, UserInput>),
      size: z.number(),
      start: z.number().optional(),
      limit: z.number().optional(),
    }).optional(),
    group: apiObject({
      results: z.array(GroupSchema),
      size: z.number(),
      start: z.number().optional(),
      limit: z.number().optional(),
    }).optional(),
    _expandable: apiObject({
      user: z.string().optional(),
      group: z.string().optional(),
    }).optional(),
  }).optional(),
  operation: OperationCheckResultSchema,
  /** Grant anonymous users permission to use the operation. */
  anonymousAccess: z.boolean(),
  /** Grants access to unlicensed users from JIRA Service Desk when used with the 'read space' operation. */
  unlicensedAccess: z.boolean(),
});
