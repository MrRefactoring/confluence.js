import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { ParentContentTypeSchema } from '#/models/parentContentType';
import { VersionSchema } from '#/models/version';
import { FolderLinksSchema } from '#/models/folderLinks';

export const FolderSchema = apiObject({
  /** ID of the folder. */
  id: z.string().optional(),
  /** The content type of the object. */
  type: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the folder. */
  title: z.string().optional(),
  /** ID of the parent content, or null if there is no parent content. */
  parentId: z.string().nullish(),
  parentType: ParentContentTypeSchema.nullish(),
  /** Position of the folder within the given parent page tree. */
  position: z.number().nullish(),
  /** The account ID of the user who created this folder. */
  authorId: z.string().optional(),
  /** The account ID of the user who owns this folder. */
  ownerId: z.string().optional(),
  /** Date and time when the folder was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /** ID of the space the folder is in. */
  spaceId: z.string().optional(),
  version: VersionSchema.nullish(),
  _links: FolderLinksSchema.nullish(),
});

export type Folder = z.infer<typeof FolderSchema>;
