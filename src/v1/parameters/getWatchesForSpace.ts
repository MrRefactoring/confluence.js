import { z } from 'zod';

export const GetWatchesForSpaceSchema = z.object({
  /** The ID of the content to be queried for its watches. */
  id: z.string(),
  /** The starting index of the returned watches. */
  start: z.number().optional(),
  /** The maximum number of watches to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type GetWatchesForSpace = z.input<typeof GetWatchesForSpaceSchema>;
