import { z } from 'zod';

export const DeleteContentVersionSchema = z.object({
  /** The ID of the content that the version will be deleted from. */
  id: z.string(),
  /** The number of the version to be deleted. The version number starts from 1 up to current version. */
  versionNumber: z.number(),
});

export type DeleteContentVersion = z.input<typeof DeleteContentVersionSchema>;
