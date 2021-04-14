import { User } from './user';
import { Group } from './group';
import { OperationCheckResult } from './operationCheckResult';

/**
 * This object represents a permission for given space. Permissions consist of*
 * at least one operation object with an accompanying subjects object.
 *
 * The following combinations of `operation` and `targetType` values are
 * valid for the `operation` object:
 *
 *   - 'create': 'page', 'blogpost', 'comment', 'attachment'
 *   - 'read': 'space'
 *   - 'delete': 'page', 'blogpost', 'comment', 'attachment'
 *   - 'export': 'space'
 *   - 'administer': 'space' */
export interface SpacePermission {
  /** The users and/or groups that the permission applies to. */
  subjects: {
    user?: {
      results: User[];
      size: number;
    };
    group?: {
      results: Group[];
      size: number;
    };
    _expandable: {
      user?: string;
      group?: string;
    };
  };
  operation: OperationCheckResult;
  /** Grant anonymous users permission to use the operation. */
  anonymousAccess: boolean;
  /** Grants access to unlicensed users from JIRA Service Desk when used
   with the 'read space' operation. */
  unlicensedAccess: boolean;
}
