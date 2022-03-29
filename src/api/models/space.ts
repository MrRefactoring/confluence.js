import { Content } from './content';
import { GenericLinks } from './genericLinks';
import { Icon } from './icon';
import { LabelArray } from './labelArray';
import { LookAndFeel } from './lookAndFeel';
import { OperationCheckResult } from './operationCheckResult';
import { SpaceDescription } from './spaceDescription';
import { SpacePermission } from './spacePermission';
import { SpaceSettings } from './spaceSettings';
import { Theme } from './theme';

export interface Space {
  id: number;
  key: string;
  name: string;
  icon?: Icon;
  description?: {
    plain?: SpaceDescription;
    view?: SpaceDescription;
  };
  homepage?: Content;
  type: string;
  metadata?: {
    labels: LabelArray;
  };
  operations?: OperationCheckResult[];
  permissions?: SpacePermission[];
  status: string;
  settings?: SpaceSettings;
  theme?: Theme;
  lookAndFeel?: LookAndFeel;
  history?: {
    createdDate: string;
  };
  _expandable: {
    settings?: string;
    metadata?: string;
    operations?: string;
    lookAndFeel?: string;
    permissions?: string;
    icon?: string;
    description?: string;
    theme?: string;
    history?: string;
    homepage?: string;
  };
  _links: GenericLinks;
}
