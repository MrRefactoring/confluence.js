import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { VersionSchema } from '#/models/version';
import { LabelSchema } from '#/models/label';
import { OptionalFieldMetaSchema } from '#/models/optionalFieldMeta';
import { OptionalFieldLinksSchema } from '#/models/optionalFieldLinks';
import { ContentPropertySchema } from '#/models/contentProperty';
import { OperationSchema } from '#/models/operation';
import { CustomContentBodySchema } from '#/models/customContentBody';
import { CustomContentLinksSchema } from '#/models/customContentLinks';

export const CustomContentSchema = apiObject({
  /** ID of the custom content. */
  id: z.string().optional(),
  /** The type of custom content. */
  type: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the custom content. */
  title: z.string().optional(),
  /**
   * ID of the space the custom content is in.
   *
   * Note: This is always returned, regardless of if the custom content has a container that is a space.
   */
  spaceId: z.string().optional(),
  /**
   * ID of the containing page.
   *
   * Note: This is only returned if the custom content has a container that is a page.
   */
  pageId: z.string().optional(),
  /**
   * ID of the containing blog post.
   *
   * Note: This is only returned if the custom content has a container that is a blog post.
   */
  blogPostId: z.string().optional(),
  /**
   * ID of the containing custom content.
   *
   * Note: This is only returned if the custom content has a container that is custom content.
   */
  customContentId: z.string().optional(),
  /** The account ID of the user who created this custom content originally. */
  authorId: z.string().optional(),
  /** Date and time when the custom content was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  version: VersionSchema.nullish(),
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
  versions: apiObject({
    results: z.array(VersionSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  body: CustomContentBodySchema.nullish(),
  _links: CustomContentLinksSchema.nullish(),
});

export type CustomContent = z.infer<typeof CustomContentSchema>;
