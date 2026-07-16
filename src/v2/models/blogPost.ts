import { z } from 'zod';
import { apiObject } from '#/core';
import { BlogPostContentStatusSchema } from './blogPostContentStatus';
import { VersionSchema } from './version';
import { BodySchema } from './body';
import { LabelSchema } from './label';
import { OptionalFieldMetaSchema } from './optionalFieldMeta';
import { OptionalFieldLinksSchema } from './optionalFieldLinks';
import { ContentPropertySchema } from './contentProperty';
import { OperationSchema } from './operation';
import { LikeSchema } from './like';
import { AbstractPageLinksSchema } from './abstractPageLinks';

export const BlogPostSchema = apiObject({
  /** ID of the blog post. */
  id: z.string().optional(),
  status: BlogPostContentStatusSchema.optional(),
  /** Title of the blog post. */
  title: z.string().optional(),
  /** ID of the space the blog post is in. */
  spaceId: z.string().optional(),
  /** The account ID of the user who created this blog post originally. */
  authorId: z.string().optional(),
  /** Date and time when the blog post was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
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
  /** Whether the blog post has been favorited by the current user. */
  isFavoritedByCurrentUser: z.boolean().optional(),
  _links: AbstractPageLinksSchema.optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
