import { z } from 'zod';

export const GetContentsWithStateSchema = z.object({
  /** The key of the space to be queried for its content state settings. */
  spaceKey: z.string(),
  /** The id of the content state to filter content by */
  'state-id': z.number(),
  /**
   * A multi-value parameter indicating which properties of the content to expand. Options include: space, version,
   * history, children, etc.
   *
   * Ex: space,version
   */
  expand: z.array(z.string()).optional(),
  /** Maximum number of results to return */
  limit: z.number().optional(),
  /** Number of result to start returning. (0 indexed) */
  start: z.number().optional(),
});

export type GetContentsWithState = z.input<typeof GetContentsWithStateSchema>;
