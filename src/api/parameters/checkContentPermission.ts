import type { ContentPermissionRequest } from '../models';

export interface CheckContentPermission extends ContentPermissionRequest {
  /** The ID of the content to check permissions against. */
  id: string;
}
