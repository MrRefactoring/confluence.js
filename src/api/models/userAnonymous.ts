import { GenericLinks } from './genericLinks';
import { Icon } from './icon';
import { OperationCheckResult } from './operationCheckResult';

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
