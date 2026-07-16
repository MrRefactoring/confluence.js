import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceSchema, type Space } from './space';
import { ContentHistorySchema, type ContentHistory } from './contentHistory';
import { VersionSchema, type Version } from './version';
import { OperationCheckResultSchema, type OperationCheckResult } from './operationCheckResult';
import { ContentChildrenSchema, type ContentChildren } from './contentChildren';
import { ContentChildTypeSchema, type ContentChildType } from './contentChildType';
import { ContainerSchema, type Container } from './container';
import { ContentBodySchema, type ContentBody } from './contentBody';
import { ContentRestrictionSchema, type ContentRestriction } from './contentRestriction';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';
import { ContentMetadataSchema, type ContentMetadata } from './contentMetadata';

export type Content = {
  id?: string;
  type: string;
  status: string;
  title?: string;
  space?: Space;
  history?: ContentHistory;
  version?: Version;
  ancestors?: Content[] | null;
  operations?: OperationCheckResult[];
  children?: ContentChildren;
  childTypes?: ContentChildType;
  descendants?: ContentChildren;
  container?: Container;
  body?: {
    view?: ContentBody;
    export_view?: ContentBody;
    styled_view?: ContentBody;
    storage?: ContentBody;
    wiki?: ContentBody;
    editor?: ContentBody;
    editor2?: ContentBody;
    anonymous_export_view?: ContentBody;
    atlas_doc_format?: ContentBody;
    dynamic?: ContentBody;
    raw?: ContentBody;
    _expandable?: {
      editor?: string;
      view?: string;
      export_view?: string;
      styled_view?: string;
      storage?: string;
      editor2?: string;
      anonymous_export_view?: string;
      atlas_doc_format?: string;
      wiki?: string;
      dynamic?: string;
      raw?: string;
    };
  };
  restrictions?: {
    read?: ContentRestriction;
    update?: ContentRestriction;
    _expandable?: {
      read?: string;
      update?: string;
    };
    _links?: GenericLinks;
  };
  metadata?: ContentMetadata;
  macroRenderedOutput?: Record<string, any>;
  extensions?: Record<string, any>;
  _expandable?: {
    childTypes?: string;
    container?: string;
    metadata?: string;
    operations?: string;
    children?: string;
    restrictions?: string;
    history?: string;
    ancestors?: string;
    body?: string;
    version?: string;
    descendants?: string;
    space?: string;
    extensions?: string;
    schedulePublishDate?: string;
    schedulePublishInfo?: string;
    macroRenderedOutput?: string;
  };
  _links?: GenericLinks;
};
/** Base object for all content types. */

export const ContentSchema: z.ZodType<Content> = apiObject({
  id: z.string().optional(),
  /** Can be "page", "blogpost", "attachment" or "content" */
  type: z.string(),
  status: z.string(),
  title: z.string().optional(),
  space: z.lazy(() => SpaceSchema).optional(),
  history: z.lazy(() => ContentHistorySchema).optional(),
  version: z.lazy(() => VersionSchema).optional(),
  ancestors: z.array(z.lazy(() => ContentSchema)).nullish(),
  operations: z.array(OperationCheckResultSchema).optional(),
  children: z.lazy(() => ContentChildrenSchema).optional(),
  childTypes: ContentChildTypeSchema.optional(),
  descendants: z.lazy(() => ContentChildrenSchema).optional(),
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
    read: z.lazy(() => ContentRestrictionSchema).optional(),
    update: z.lazy(() => ContentRestrictionSchema).optional(),
    _expandable: apiObject({
      read: z.string().optional(),
      update: z.string().optional(),
    }).optional(),
    _links: GenericLinksSchema.optional(),
  }).optional(),
  metadata: z.lazy(() => ContentMetadataSchema).optional(),
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
  }).optional(),
  _links: GenericLinksSchema.optional(),
});
