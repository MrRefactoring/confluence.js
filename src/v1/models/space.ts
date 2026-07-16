import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema, type Icon } from './icon';
import { SpaceDescriptionSchema, type SpaceDescription } from './spaceDescription';
import { ContentSchema, type Content } from './content';
import { LabelArraySchema, type LabelArray } from './labelArray';
import { OperationCheckResultSchema, type OperationCheckResult } from './operationCheckResult';
import { SpacePermissionSchema, type SpacePermission } from './spacePermission';
import { SpaceSettingsSchema, type SpaceSettings } from './spaceSettings';
import { ThemeSchema, type Theme } from './theme';
import { LookAndFeelSchema, type LookAndFeel } from './lookAndFeel';
import { UserSchema, type User } from './user';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type Space = {
  id?: number;
  key: string;
  alias?: string;
  name: string;
  icon?: Icon;
  description?: {
    plain?: SpaceDescription;
    view?: SpaceDescription;
    _expandable?: {
      view?: string;
      plain?: string;
    };
  };
  homepage?: Content;
  type: string;
  metadata?: {
    labels?: LabelArray;
    _expandable?: Record<string, any>;
  };
  operations?: OperationCheckResult[];
  permissions?: SpacePermission[];
  status: string;
  settings?: SpaceSettings;
  theme?: Theme;
  lookAndFeel?: LookAndFeel;
  history?: {
    createdDate: Date;
    createdBy?: User;
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
    identifiers?: string;
  };
  _links: GenericLinks;
};

export const SpaceSchema: z.ZodType<Space> = apiObject({
  id: z.number().optional(),
  key: z.string(),
  alias: z.string().optional(),
  name: z.string(),
  icon: IconSchema.optional(),
  description: apiObject({
    plain: SpaceDescriptionSchema.optional(),
    view: SpaceDescriptionSchema.optional(),
    _expandable: apiObject({
      view: z.string().optional(),
      plain: z.string().optional(),
    }).optional(),
  }).optional(),
  homepage: z.lazy(() => ContentSchema).optional(),
  type: z.string(),
  metadata: apiObject({
    labels: LabelArraySchema.optional(),
    _expandable: z.record(z.string(), z.any()).optional(),
  }).optional(),
  operations: z.array(OperationCheckResultSchema).optional(),
  permissions: z.array(z.lazy(() => SpacePermissionSchema)).optional(),
  status: z.string(),
  settings: SpaceSettingsSchema.optional(),
  theme: ThemeSchema.optional(),
  lookAndFeel: LookAndFeelSchema.optional(),
  history: apiObject({
    createdDate: z.coerce.date(),
    createdBy: z.lazy(() => UserSchema).optional(),
  }).optional(),
  _expandable: apiObject({
    settings: z.string().optional(),
    metadata: z.string().optional(),
    operations: z.string().optional(),
    lookAndFeel: z.string().optional(),
    permissions: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
    theme: z.string().optional(),
    history: z.string().optional(),
    homepage: z.string().optional(),
    identifiers: z.string().optional(),
  }),
  _links: GenericLinksSchema,
});
