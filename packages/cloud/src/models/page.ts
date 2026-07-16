import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { ParentContentTypeSchema } from '#/models/parentContentType';
import { VersionSchema } from '#/models/version';
import { BodySchema } from '#/models/body';
import { LabelSchema } from '#/models/label';
import { OptionalFieldMetaSchema } from '#/models/optionalFieldMeta';
import { OptionalFieldLinksSchema } from '#/models/optionalFieldLinks';
import { ContentPropertySchema } from '#/models/contentProperty';
import { OperationSchema } from '#/models/operation';
import { LikeSchema } from '#/models/like';
import { AbstractPageLinksSchema } from '#/models/abstractPageLinks';

export const PageSchema = apiObject({
  /** ID of the page. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the page. */
  title: z.string().optional(),
  /** ID of the space the page is in. */
  spaceId: z.string().optional(),
  /** ID of the parent page, or null if there is no parent page. */
  parentId: z.string().nullish(),
  parentType: ParentContentTypeSchema.nullish(),
  /** Position of child page within the given parent page tree. */
  position: z.number().nullish(),
  /** The account ID of the user who created this page originally. */
  authorId: z.string().optional(),
  /** The account ID of the user who owns this page. */
  ownerId: z.string().nullish(),
  /** The account ID of the user who owned this page previously, or null if there is no previous owner. */
  lastOwnerId: z.string().nullish(),
  /** Date and time when the page was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  version: VersionSchema.nullish(),
  body: BodySchema.nullish(),
  labels: apiObject({
    results: z.array(LabelSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  properties: apiObject({
    results: z.array(ContentPropertySchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  operations: apiObject({
    results: z.array(OperationSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  likes: apiObject({
    results: z.array(LikeSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  versions: apiObject({
    results: z.array(VersionSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  /** Whether the page has been favorited by the current user. */
  isFavoritedByCurrentUser: z.boolean().optional(),
  _links: AbstractPageLinksSchema.nullish(),
});

export type Page = z.infer<typeof PageSchema>;
