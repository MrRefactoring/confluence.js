import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionSubjectWithGroupIdSchema } from './permissionSubjectWithGroupId';
/** This object represents the request for the content permission check API. */

export const ContentPermissionRequestSchema = apiObject({
  subject: PermissionSubjectWithGroupIdSchema,
  /** The content permission operation to check. */
  operation: z.enum(['read', 'update', 'delete']),
});

export type ContentPermissionRequest = z.infer<typeof ContentPermissionRequestSchema>;
