import type { GenericLinks } from './genericLinks.js';
import type { Icon } from './icon.js';
import type { OperationCheckResult } from './operationCheckResult.js';

export interface UserAnonymous {
  type: string;
  profilePicture: Icon;
  displayName: string;
  operations?: OperationCheckResult[];
  _expandable: {
    operations?: string;
  };
  _links: GenericLinks;
}
