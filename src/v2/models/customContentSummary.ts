import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { VersionSchema } from './version';
import { CustomContentBodySummarySchema } from './customContentBodySummary';
import { CustomContentLinksSchema } from './customContentLinks';

export const CustomContentSummarySchema = apiObject({
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
  body: CustomContentBodySummarySchema.nullish(),
  _links: CustomContentLinksSchema.nullish(),
});

export type CustomContentSummary = z.infer<typeof CustomContentSummarySchema>;
