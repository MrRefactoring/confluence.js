import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { VersionedEntitySchema } from '#/models/versionedEntity';

export const AttachmentVersionSchema = apiObject({
  /** Date and time when the version was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /** Message associated with the current version. */
  message: z.string().optional(),
  /** The version number. */
  number: z.number().optional(),
  /**
   * Describes if this version is a minor version. Email notifications and activity stream updates are not created for
   * minor versions.
   */
  minorEdit: z.boolean().optional(),
  /** The account ID of the user who created this version. */
  authorId: z.string().optional(),
  attachment: VersionedEntitySchema.nullish(),
});

export type AttachmentVersion = z.infer<typeof AttachmentVersionSchema>;
