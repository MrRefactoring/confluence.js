import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { ParentContentTypeSchema } from '#/models/parentContentType';
import { VersionSchema } from '#/models/version';
import { WhiteboardLinksSchema } from '#/models/whiteboardLinks';

export const WhiteboardSchema = apiObject({
  /** ID of the whiteboard. */
  id: z.string().optional(),
  /** The content type of the object. */
  type: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the whiteboard. */
  title: z.string().optional(),
  /** ID of the parent content, or null if there is no parent content. */
  parentId: z.string().nullish(),
  parentType: ParentContentTypeSchema.nullish(),
  /** Position of the whiteboard within the given parent page tree. */
  position: z.number().nullish(),
  /** The account ID of the user who created this whiteboard originally. */
  authorId: z.string().optional(),
  /** The account ID of the user who owns this whiteboard. */
  ownerId: z.string().optional(),
  /** Date and time when the whiteboard was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /** ID of the space the whiteboard is in. */
  spaceId: z.string().optional(),
  version: VersionSchema.nullish(),
  _links: WhiteboardLinksSchema.nullish(),
});

export type Whiteboard = z.infer<typeof WhiteboardSchema>;
