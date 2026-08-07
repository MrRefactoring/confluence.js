import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceSchema } from './space';
import { ContentHistorySchema } from './contentHistory';
import { VersionSchema } from './version';
import { ContentSchema } from './content';
import { OperationCheckResultSchema } from './operationCheckResult';
import { ContentChildrenSchema } from './contentChildren';
import { ContentChildTypeSchema } from './contentChildType';
import { ContainerSchema } from './container';
import { ContentBodySchema } from './contentBody';
import { ContentRestrictionSchema } from './contentRestriction';
import { GenericLinksSchema } from './genericLinks';
import { ContentMetadataSchema } from './contentMetadata';
/** Representation of a blogpost (content) */

export const ContentBlogpostSchema = apiObject({
  id: z.string().optional(),
  /** Can be "page", "blogpost", "attachment" or "content" */
  type: z.string(),
  status: z.string(),
  title: z.string().optional(),
  space: SpaceSchema.optional(),
  history: ContentHistorySchema.optional(),
  version: VersionSchema.optional(),
  ancestors: z.array(ContentSchema).nullish(),
  operations: z.array(OperationCheckResultSchema).optional(),
  children: ContentChildrenSchema.optional(),
  childTypes: ContentChildTypeSchema.optional(),
  descendants: ContentChildrenSchema.optional(),
  container: ContainerSchema.optional(),
  body: apiObject({
    view: ContentBodySchema.optional(),
    export_view: ContentBodySchema.optional(),
    styled_view: ContentBodySchema.optional(),
    storage: ContentBodySchema.optional(),
    wiki: ContentBodySchema.optional(),
    editor: ContentBodySchema.optional(),
    editor2: ContentBodySchema.optional(),
    anonymous_export_view: ContentBodySchema.optional(),
    atlas_doc_format: ContentBodySchema.optional(),
    dynamic: ContentBodySchema.optional(),
    raw: ContentBodySchema.optional(),
    _expandable: apiObject({
      editor: z.string().optional(),
      view: z.string().optional(),
      export_view: z.string().optional(),
      styled_view: z.string().optional(),
      storage: z.string().optional(),
      editor2: z.string().optional(),
      anonymous_export_view: z.string().optional(),
      atlas_doc_format: z.string().optional(),
      wiki: z.string().optional(),
      dynamic: z.string().optional(),
      raw: z.string().optional(),
    }).optional(),
  }).optional(),
  restrictions: apiObject({
    read: ContentRestrictionSchema.optional(),
    update: ContentRestrictionSchema.optional(),
    _expandable: apiObject({
      read: z.string().optional(),
      update: z.string().optional(),
    }).optional(),
    _links: GenericLinksSchema.optional(),
  }).optional(),
  macroRenderedOutput: z.record(z.string(), z.any()).optional(),
  extensions: z.record(z.string(), z.any()).optional(),
  _expandable: apiObject({
    childTypes: z.string().optional(),
    container: z.string().optional(),
    metadata: z.string().optional(),
    operations: z.string().optional(),
    children: z.string().optional(),
    restrictions: z.string().optional(),
    history: z.string().optional(),
    ancestors: z.string().optional(),
    body: z.string().optional(),
    version: z.string().optional(),
    descendants: z.string().optional(),
    space: z.string().optional(),
    extensions: z.string().optional(),
    schedulePublishDate: z.string().optional(),
    schedulePublishInfo: z.string().optional(),
    macroRenderedOutput: z.string().optional(),
    draftVersion: z.string().optional(),
  }).optional(),
  ari: z.string().optional(),
  base64EncodedAri: z.string().optional(),
  metadata: ContentMetadataSchema,
  _links: GenericLinksSchema,
});

export type ContentBlogpost = z.infer<typeof ContentBlogpostSchema>;
