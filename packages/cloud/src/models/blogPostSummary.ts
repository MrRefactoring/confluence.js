import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BlogPostContentStatusSchema } from '#/models/blogPostContentStatus';
import { VersionSchema } from '#/models/version';
import { BodySummarySchema } from '#/models/bodySummary';
import { AbstractPageLinksSchema } from '#/models/abstractPageLinks';

export const BlogPostSummarySchema = apiObject({
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
  body: BodySummarySchema.nullish(),
  _links: AbstractPageLinksSchema.nullish(),
});

export type BlogPostSummary = z.infer<typeof BlogPostSummarySchema>;
