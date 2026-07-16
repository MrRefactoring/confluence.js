import { z } from 'zod';
import { apiObject } from '#/core';

export const SpacePermissionAssignmentSchema = apiObject({
  /** ID of the space permission. */
  id: z.string().optional(),
  /** The entity the space permissions corresponds to. */
  principal: apiObject({
    type: z.string().optional(),
    /** ID of the entity. */
    id: z.string().optional(),
  }).nullish(),
  /** The operation the space permission corresponds to. */
  operation: apiObject({
    /** The type of operation. */
    key: z.string().optional(),
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
  }).nullish(),
});

export type SpacePermissionAssignment = z.infer<typeof SpacePermissionAssignmentSchema>;
