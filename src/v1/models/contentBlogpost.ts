import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceSchema, type Space, type SpaceInput } from './space';
import { ContentHistorySchema, type ContentHistory, type ContentHistoryInput } from './contentHistory';
import { VersionSchema, type Version, type VersionInput } from './version';
import { ContentSchema, type Content, type ContentInput } from './content';
import { OperationCheckResultSchema } from './operationCheckResult';
import { ContentChildrenSchema, type ContentChildren, type ContentChildrenInput } from './contentChildren';
import { ContentChildTypeSchema } from './contentChildType';
import { ContainerSchema } from './container';
import { ContentBodySchema } from './contentBody';
import { ContentRestrictionSchema, type ContentRestriction, type ContentRestrictionInput } from './contentRestriction';
import { GenericLinksSchema } from './genericLinks';
import { ContentMetadataSchema, type ContentMetadata, type ContentMetadataInput } from './contentMetadata';

/** Representation of a blogpost (content) */
export const ContentBlogpostSchema = apiObject({
  id: z.string().optional(),
  /** Can be "page", "blogpost", "attachment" or "content" */
  type: z.string(),
  status: z.string(),
  title: z.string().optional(),
  space: (SpaceSchema as z.ZodType<Space, SpaceInput>).optional(),
  history: (ContentHistorySchema as z.ZodType<ContentHistory, ContentHistoryInput>).optional(),
  version: (VersionSchema as z.ZodType<Version, VersionInput>).optional(),
  ancestors: z.array(ContentSchema as z.ZodType<Content, ContentInput>).nullish(),
  operations: z.array(OperationCheckResultSchema).optional(),
  children: (ContentChildrenSchema as z.ZodType<ContentChildren, ContentChildrenInput>).optional(),
  childTypes: ContentChildTypeSchema.optional(),
  descendants: (ContentChildrenSchema as z.ZodType<ContentChildren, ContentChildrenInput>).optional(),
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
    read: (ContentRestrictionSchema as z.ZodType<ContentRestriction, ContentRestrictionInput>).optional(),
    update: (ContentRestrictionSchema as z.ZodType<ContentRestriction, ContentRestrictionInput>).optional(),
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
  metadata: ContentMetadataSchema as z.ZodType<ContentMetadata, ContentMetadataInput>,
  _links: GenericLinksSchema,
});

export type ContentBlogpost = z.infer<typeof ContentBlogpostSchema>;
