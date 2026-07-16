import { z } from 'zod';

export const GetCustomContentVersionDetailsSchema = z.object({
  /** The ID of the custom content for which version details should be returned. */
  customContentId: z.number(),
  /** The version number of the custom content to be returned. */
  versionNumber: z.number(),
});

export type GetCustomContentVersionDetails = z.input<typeof GetCustomContentVersionDetailsSchema>;
