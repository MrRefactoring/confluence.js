import { ContentPermissionRequest } from '../models';

export interface PermissionCheck extends ContentPermissionRequest {
  /** The ID of the content to check permissions against. */
  id: string;
}
