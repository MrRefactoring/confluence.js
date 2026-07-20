import { z } from 'zod';

export const GetViewsSchema = z.object({
  /** The ID of the content to get the views for. */
  contentId: z.string(),
  /** The number of views for the content since the date. */
  fromDate: z.string().optional(),
});

export type GetViews = z.input<typeof GetViewsSchema>;
