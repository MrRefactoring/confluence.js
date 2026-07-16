import { z } from 'zod';

export const GetSpaceContentStatesSchema = z.object({
  /** The key of the space to be queried for its content state settings. */
  spaceKey: z.string(),
});

export type GetSpaceContentStates = z.input<typeof GetSpaceContentStatesSchema>;
