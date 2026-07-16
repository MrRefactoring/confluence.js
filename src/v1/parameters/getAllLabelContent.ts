import { z } from 'zod';

export const GetAllLabelContentSchema = z.object({
  /** Name of the label to query. */
  name: z.string(),
  /** The type of contents that are to be returned. */
  type: z.enum(['page', 'blogpost', 'attachment', 'page_template']).optional(),
  /** The starting offset for the results. */
  start: z.number().optional(),
  /** The number of results to be returned. */
  limit: z.number().optional(),
});

export type GetAllLabelContent = z.input<typeof GetAllLabelContentSchema>;
