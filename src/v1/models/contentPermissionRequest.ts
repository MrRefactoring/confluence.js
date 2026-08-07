import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { PermissionSubjectWithGroupIdSchema } from './permissionSubjectWithGroupId';
/** This object represents the request for the content permission check API. */

export const ContentPermissionRequestSchema = apiObject({
  subject: PermissionSubjectWithGroupIdSchema,
  /** The content permission operation to check. */
  operation: openEnum(['read', 'update', 'delete']),
});

export type ContentPermissionRequest = z.infer<typeof ContentPermissionRequestSchema>;
