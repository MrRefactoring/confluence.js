import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { ParentContentTypeSchema } from '#/models/parentContentType';
import { VersionSchema } from '#/models/version';
import { SmartLinkLinksSchema } from '#/models/smartLinkLinks';

export const SmartLinkSchema = apiObject({
  /** ID of the Smart Link in the content tree. */
  id: z.string().optional(),
  /** The content type of the object. */
  type: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the Smart Link in the content tree. */
  title: z.string().optional(),
  /** ID of the parent content, or null if there is no parent content. */
  parentId: z.string().nullish(),
  parentType: ParentContentTypeSchema.nullish(),
  /** Position of the Smart Link within the given parent page tree. */
  position: z.number().nullish(),
  /** The account ID of the user who created this Smart Link in the content tree originally. */
  authorId: z.string().optional(),
  /** The account ID of the user who owns this Smart Link in the content tree. */
  ownerId: z.string().optional(),
  /** Date and time when the Smart Link in the content tree was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /**
   * The embedded URL of the Smart Link. If the Smart Link does not have an embedded URL, this property will not be
   * included in the response.
   */
  embedUrl: z.string().optional(),
  /** ID of the space the Smart Link is in. */
  spaceId: z.string().optional(),
  version: VersionSchema.nullish(),
  _links: SmartLinkLinksSchema.nullish(),
});

export type SmartLink = z.infer<typeof SmartLinkSchema>;
