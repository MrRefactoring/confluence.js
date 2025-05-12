import type { GenericLinks } from './genericLinks';
import type { Icon } from './icon';
import type { OperationCheckResult } from './operationCheckResult';

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
