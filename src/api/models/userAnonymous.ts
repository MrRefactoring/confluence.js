import { Icon } from './icon';
import { OperationCheckResult } from './operationCheckResult';
import { GenericLinks } from './genericLinks';

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
