import type { Content } from './content.js';
import type { GenericLinks } from './genericLinks.js';
import type { Icon } from './icon.js';
import type { LabelArray } from './labelArray.js';
import type { LookAndFeel } from './lookAndFeel.js';
import type { OperationCheckResult } from './operationCheckResult.js';
import type { SpaceDescription } from './spaceDescription.js';
import type { SpacePermission } from './spacePermission.js';
import type { SpaceSettings } from './spaceSettings.js';
import type { Theme } from './theme.js';

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
