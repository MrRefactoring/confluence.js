import { z } from 'zod';

export const GetPageVersionDetailsSchema = z.object({
  /** The ID of the page for which version details should be returned. */
  pageId: z.number(),
  /** The version number of the page to be returned. */
  versionNumber: z.number(),
});

export type GetPageVersionDetails = z.input<typeof GetPageVersionDetailsSchema>;
