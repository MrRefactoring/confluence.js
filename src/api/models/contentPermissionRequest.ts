import { PermissionSubjectWithGroupId } from './permissionSubjectWithGroupId';

/**
 * This object represents the request for the content permission check API. */
export interface ContentPermissionRequest {
  subject: PermissionSubjectWithGroupId;
  /** The content permission operation to check. */
  operation: string;
}
