import { Icon } from './icon';
import { SpaceDescription } from './spaceDescription';
import { Content } from './content';
import { LabelArray } from './labelArray';
import { OperationCheckResult } from './operationCheckResult';
import { SpacePermission } from './spacePermission';
import { SpaceSettings } from './spaceSettings';
import { Theme } from './theme';
import { LookAndFeel } from './lookAndFeel';

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
  _links: Record<string, any>;
}
