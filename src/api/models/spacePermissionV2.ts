import { PermissionSubject } from './permissionSubject';
import { GenericLinks } from './genericLinks';

/**
 * This object represents a single space permission. Permissions consist of* at least one operation object with an
 * accompanying subjects object.
 *
 * The following combinations of `operation.key` and `operation.target` values are valid for the `operation` object:
 *
 * ```bash
 * 'create': 'page', 'blogpost', 'comment', 'attachment'
 * 'read': 'space'
 * 'delete': 'page', 'blogpost', 'comment', 'attachment'
 * 'export': 'space'
 * 'administer': 'space'
 * ```
 */
export interface SpacePermissionV2 {
  id?: number;
  subject: PermissionSubject;
  operation: {
    key: string;
    /** The space or content type that the operation applies to. */
    target: string;
  };
  _links?: GenericLinks;
}
