import { z } from 'zod';

export const UpdatePageTitleSchema = z.object({
  /** The ID of the page to be updated. If you don't know the page ID, use Get Pages and filter the results */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type UpdatePageTitle = z.input<typeof UpdatePageTitleSchema>;
