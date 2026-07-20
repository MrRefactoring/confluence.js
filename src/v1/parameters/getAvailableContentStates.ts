import { z } from 'zod';

export const GetAvailableContentStatesSchema = z.object({
  /** Id of content to get available states for */
  id: z.string(),
});

export type GetAvailableContentStates = z.input<typeof GetAvailableContentStatesSchema>;
