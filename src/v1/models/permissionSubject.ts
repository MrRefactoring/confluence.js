import { z } from 'zod';
import { apiObject } from '#/core';
/** The user or group that the permission applies to. */

export const PermissionSubjectSchema = apiObject({
  type: z.enum(['user', 'group']),
  /**
   * For `type=user`, identifier should be user's accountId or `anonymous` for anonymous users
   *
   * For `type=group`, identifier should be the groupId.
   */
  identifier: z.string(),
});

export type PermissionSubject = z.infer<typeof PermissionSubjectSchema>;
