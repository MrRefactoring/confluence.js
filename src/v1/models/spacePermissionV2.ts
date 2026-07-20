import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionSubjectSchema } from './permissionSubject';
import { GenericLinksSchema } from './genericLinks';
/**
 * This object represents a single space permission. Permissions consist of* at least one operation object with an
 * accompanying subjects object.*
 *
 * The following combinations of `operation.key` and `operation.target` values are* valid for the `operation` object:*
 *
 * ```bash*
 * 'create': 'page', 'blogpost', 'comment', 'attachment'*
 * 'read': 'space'*
 * 'delete': 'page', 'blogpost', 'comment', 'attachment', 'space'*
 * 'export': 'space'*
 * 'administer': 'space'*
 * 'archive': 'page'*
 * 'restrict_content': 'space'*
 * ```*
 *
 * For example, to enable Delete Own permission, set the `operation` object to the following:*
 * ```*
 * "operation": {*
 *     "key": "delete",*
 *     "target": "space"*
 * }*
 * ```*
 * To enable Add/Delete Restrictions permissions, set the `operation` object to the following:*
 * ```*
 * "operation": {*
 *     "key": "restrict_content",*
 *     "target": "space"*
 * }*
 * ```
 */

export const SpacePermissionV2Schema = apiObject({
  id: z.number(),
  subject: PermissionSubjectSchema,
  operation: apiObject({
    key: z.enum([
      'administer',
      'archive',
      'copy',
      'create',
      'delete',
      'export',
      'move',
      'purge',
      'purge_version',
      'read',
      'restore',
      'restrict_content',
      'update',
      'use',
    ]),
    /** The space or content type that the operation applies to. */
    target: z.enum(['page', 'blogpost', 'comment', 'attachment', 'space']),
  }),
  _links: GenericLinksSchema.optional(),
});

export type SpacePermissionV2 = z.infer<typeof SpacePermissionV2Schema>;
