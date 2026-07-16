import { z } from 'zod';

export const GetWatchersForSpaceSchema = z.object({
  /** The key of the space to get watchers. */
  spaceKey: z.string(),
  /** The start point of the collection to return. */
  start: z.string().optional(),
  /** The limit of the number of items to return, this may be restricted by fixed system limits. */
  limit: z.string().optional(),
});

export type GetWatchersForSpace = z.input<typeof GetWatchersForSpaceSchema>;
