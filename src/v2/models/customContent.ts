import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { LabelSchema } from './label';
import { OptionalFieldMetaSchema } from './optionalFieldMeta';
import { OptionalFieldLinksSchema } from './optionalFieldLinks';
import { ContentPropertySchema } from './contentProperty';
import { OperationSchema } from './operation';
import { CustomContentBodySchema } from './customContentBody';
import { CustomContentLinksSchema } from './customContentLinks';

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
  version: VersionSchema.optional(),
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
  versions: apiObject({
    results: z.array(VersionSchema).optional(),
    meta: OptionalFieldMetaSchema.optional(),
    _links: OptionalFieldLinksSchema.optional(),
  }).optional(),
  body: CustomContentBodySchema.optional(),
  _links: CustomContentLinksSchema.optional(),
});

export type CustomContent = z.infer<typeof CustomContentSchema>;
