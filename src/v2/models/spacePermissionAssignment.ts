import { z } from 'zod';
import { apiObject } from '#/core';

export const SpacePermissionAssignmentSchema = apiObject({
  /** ID of the space permission. */
  id: z.string().optional(),
  /** The entity the space permissions corresponds to. */
  principal: apiObject({
    type: z.enum(['user', 'group', 'role']).optional(),
    /** ID of the entity. */
    id: z.string().optional(),
  }).optional(),
  /** The operation the space permission corresponds to. */
  operation: apiObject({
    /** The type of operation. */
    key: z
      .enum([
        'use',
        'create',
        'read',
        'update',
        'delete',
        'copy',
        'move',
        'export',
        'purge',
        'purge_version',
        'administer',
        'restore',
        'create_space',
        'restrict_content',
        'archive',
      ])
      .optional(),
    /** The type of entity the operation type targets. */
    targetType: z
      .enum([
        'page',
        'blogpost',
        'comment',
        'attachment',
        'whiteboard',
        'database',
        'embed',
        'folder',
        'space',
        'application',
        'userProfile',
      ])
      .optional(),
  }).optional(),
});

export type SpacePermissionAssignment = z.infer<typeof SpacePermissionAssignmentSchema>;
