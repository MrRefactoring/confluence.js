import type { PermissionSubject } from './permissionSubject';

/**
 * This object represents a list of space permissions for custom content type for an individual user. Permissions
 * consist of* a subjects object and a list with at least one operation object.
 */
export interface SpacePermissionCustomContent {
  subject: PermissionSubject;
  operations: {
    /** The operation type */
    key: string;
    /** The custom content type */
    target: string;
    /** Grant or restrict access */
    access: boolean;
  }[];
}
