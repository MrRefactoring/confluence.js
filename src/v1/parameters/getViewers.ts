import { z } from 'zod';

export const GetViewersSchema = z.object({
  /** The ID of the content to get the viewers for. */
  contentId: z.string(),
  /** The number of views for the content since the date. */
  fromDate: z.string().optional(),
});

export type GetViewers = z.input<typeof GetViewersSchema>;
