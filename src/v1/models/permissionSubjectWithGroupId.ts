import { z } from 'zod';
import { apiObject } from '#/core';
/** The user or group that the permission applies to. */

export const PermissionSubjectWithGroupIdSchema = apiObject({
  type: z.enum(['user', 'group']),
  /**
   * For `type=user`, identifier should be user's accountId or `anonymous` for anonymous users
   *
   * For `type=group`, identifier should be ID of the group
   */
  identifier: z.string(),
});

export type PermissionSubjectWithGroupId = z.infer<typeof PermissionSubjectWithGroupIdSchema>;
