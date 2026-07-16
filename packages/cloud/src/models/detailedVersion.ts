import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const DetailedVersionSchema = apiObject({
  /** The current version number. */
  number: z.number().optional(),
  /** The account ID of the user who created this version. */
  authorId: z.string().optional(),
  /** Message associated with the current version. */
  message: z.string().optional(),
  /** Date and time when the version was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /**
   * Describes if this version is a minor version. Email notifications and activity stream updates are not created for
   * minor versions.
   */
  minorEdit: z.boolean().optional(),
  /** Describes if the content type is modified in this version (e.g. page to blog) */
  contentTypeModified: z.boolean().optional(),
  /** The account IDs of users that collaborated on this version. */
  collaborators: z.array(z.string()).nullish(),
  /** The version number of the version prior to this current content update. */
  prevVersion: z.number().nullish(),
  /** The version number of the version after this current content update. */
  nextVersion: z.number().nullish(),
});

export type DetailedVersion = z.infer<typeof DetailedVersionSchema>;
