import type { Content } from './content';
import type { GenericLinks } from './genericLinks';
import type { Icon } from './icon';
import type { LabelArray } from './labelArray';
import type { LookAndFeel } from './lookAndFeel';
import type { OperationCheckResult } from './operationCheckResult';
import type { SpaceDescription } from './spaceDescription';
import type { SpacePermission } from './spacePermission';
import type { SpaceSettings } from './spaceSettings';
import type { Theme } from './theme';

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
