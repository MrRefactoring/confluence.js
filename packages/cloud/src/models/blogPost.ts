import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BlogPostContentStatusSchema } from '#/models/blogPostContentStatus';
import { VersionSchema } from '#/models/version';
import { BodySchema } from '#/models/body';
import { LabelSchema } from '#/models/label';
import { OptionalFieldMetaSchema } from '#/models/optionalFieldMeta';
import { OptionalFieldLinksSchema } from '#/models/optionalFieldLinks';
import { ContentPropertySchema } from '#/models/contentProperty';
import { OperationSchema } from '#/models/operation';
import { LikeSchema } from '#/models/like';
import { AbstractPageLinksSchema } from '#/models/abstractPageLinks';

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
  /** Whether the blog post has been favorited by the current user. */
  isFavoritedByCurrentUser: z.boolean().optional(),
  _links: AbstractPageLinksSchema.nullish(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
