import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { ParentContentTypeSchema } from './parentContentType';
import { VersionSchema } from './version';
import { BodySchema } from './body';
import { LabelSchema } from './label';
import { OptionalFieldMetaSchema } from './optionalFieldMeta';
import { OptionalFieldLinksSchema } from './optionalFieldLinks';
import { ContentPropertySchema } from './contentProperty';
import { OperationSchema } from './operation';
import { LikeSchema } from './like';
import { AbstractPageLinksSchema } from './abstractPageLinks';

export const PageSchema = apiObject({
  /** ID of the page. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the page. */
  title: z.string().optional(),
  /** ID of the space the page is in. */
  spaceId: z.string().optional(),
  /** ID of the parent page, or null if there is no parent page. */
  parentId: z.string().optional(),
  parentType: ParentContentTypeSchema.optional(),
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
  version: VersionSchema.optional(),
  body: BodySchema.optional(),
  labels: apiObject({
    results: z.array(LabelSchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  properties: apiObject({
    results: z.array(ContentPropertySchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  operations: apiObject({
    results: z.array(OperationSchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  likes: apiObject({
    results: z.array(LikeSchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  versions: apiObject({
    results: z.array(VersionSchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  /** Whether the page has been favorited by the current user. */
  isFavoritedByCurrentUser: z.boolean().optional(),
  _links: AbstractPageLinksSchema.optional(),
});

export type Page = z.infer<typeof PageSchema>;
