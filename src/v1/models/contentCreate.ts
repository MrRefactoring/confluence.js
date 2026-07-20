import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';
import { GlobalSpaceIdentifierSchema } from './globalSpaceIdentifier';
import { SpaceDescriptionSchema } from './spaceDescription';
import { ContentSchema } from './content';
import { LabelArraySchema } from './labelArray';
import { OperationCheckResultSchema } from './operationCheckResult';
import { SpacePermissionSchema } from './spacePermission';
import { SpaceSettingsSchema } from './spaceSettings';
import { ThemeSchema } from './theme';
import { LookAndFeelSchema } from './lookAndFeel';
import { UserSchema } from './user';
import { ContentBodyCreateSchema } from './contentBodyCreate';

export const ContentCreateSchema = apiObject({
  /** The ID of the draft content. Required when publishing a draft. */
  id: z.string().nullish(),
  title: z.string().max(255, 'title must be at most 255 characters').nullish(),
  /**
   * The type of the new content. Custom content types defined by apps are also supported. eg. 'page', 'blogpost',
   * 'comment' etc.
   */
  type: z.string(),
  /** The space that the content is being created in. */
  space: apiObject({
    id: z.number().nullish(),
    name: z.string().nullish(),
    icon: IconSchema.optional(),
    identifiers: GlobalSpaceIdentifierSchema.optional(),
    description: apiObject({
      plain: SpaceDescriptionSchema.optional(),
      view: SpaceDescriptionSchema.optional(),
      _expandable: apiObject({
        view: z.string().optional(),
        plain: z.string().optional(),
      }).optional(),
    }).nullish(),
    homepage: ContentSchema.optional(),
    type: z.string().nullish(),
    metadata: apiObject({
      labels: LabelArraySchema.optional(),
      _expandable: z.record(z.string(), z.any()).optional(),
    }).nullish(),
    operations: z.array(OperationCheckResultSchema).nullish(),
    permissions: z.array(SpacePermissionSchema).nullish(),
    status: z.string().nullish(),
    settings: SpaceSettingsSchema.optional(),
    theme: ThemeSchema.optional(),
    lookAndFeel: LookAndFeelSchema.optional(),
    history: apiObject({
      createdDate: z.coerce.date(),
      createdBy: UserSchema.optional(),
    }).optional(),
    /** The key of the space. */
    key: z.string(),
    links: z.record(z.string(), z.any()).nullish(),
  }).nullish(),
  /** The status of the new content. */
  status: z.enum(['current', 'deleted', 'historical', 'draft']).optional(),
  /**
   * The container of the content. Required if type is `comment` or certain types of custom content. If you are trying
   * to create a comment that is a child of another comment, specify the parent comment in the ancestors field, not in
   * this field.
   */
  container: apiObject({
    /** The `id` of the container. */
    id: z.union([z.number(), z.string()]),
    /** The `type` of the container. */
    type: z.string(),
  }).nullish(),
  /**
   * The parent content of the new content. If you are creating a top-level `page` or `comment`, this can be left
   * blank. If you are creating a child page, this is where the parent page id goes. If you are creating a child
   * comment, this is where the parent comment id goes. Only one parent content id can be specified.
   */
  ancestors: z
    .array(
      apiObject({
        /** The `id` of the parent content. */
        id: z.string(),
      }),
    )
    .nullish(),
  /**
   * The body of the new content. Does not apply to attachments. Only one body format should be specified as the
   * property for this object, e.g. `storage`.
   *
   * Note, `editor2` format is used by Atlassian only. `anonymous_export_view` is the same as `export_view` format but
   * only content viewable by an anonymous user is included.
   */
  body: apiObject({
    view: ContentBodyCreateSchema.optional(),
    export_view: ContentBodyCreateSchema.optional(),
    styled_view: ContentBodyCreateSchema.optional(),
    storage: ContentBodyCreateSchema.optional(),
    editor: ContentBodyCreateSchema.optional(),
    editor2: ContentBodyCreateSchema.optional(),
    wiki: ContentBodyCreateSchema.optional(),
    anonymous_export_view: ContentBodyCreateSchema.optional(),
    plain: ContentBodyCreateSchema.optional(),
    atlas_doc_format: ContentBodyCreateSchema.optional(),
    raw: ContentBodyCreateSchema.optional(),
  }).optional(),
});

export type ContentCreate = z.infer<typeof ContentCreateSchema>;
