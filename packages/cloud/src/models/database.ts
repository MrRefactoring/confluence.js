import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentStatusSchema } from '#/models/contentStatus';
import { ParentContentTypeSchema } from '#/models/parentContentType';
import { VersionSchema } from '#/models/version';
import { DatabaseLinksSchema } from '#/models/databaseLinks';

export const DatabaseSchema = apiObject({
  /** ID of the database. */
  id: z.string().optional(),
  /** The content type of the object. */
  type: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the database. */
  title: z.string().optional(),
  /** ID of the parent content, or null if there is no parent content. */
  parentId: z.string().nullish(),
  parentType: ParentContentTypeSchema.nullish(),
  /** Position of the database within the given parent page tree. */
  position: z.number().nullish(),
  /** The account ID of the user who created this database originally. */
  authorId: z.string().optional(),
  /** The account ID of the user who owns this database. */
  ownerId: z.string().optional(),
  /** Date and time when the database was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /** ID of the space the database is in. */
  spaceId: z.string().optional(),
  version: VersionSchema.nullish(),
  _links: DatabaseLinksSchema.nullish(),
});

export type Database = z.infer<typeof DatabaseSchema>;
