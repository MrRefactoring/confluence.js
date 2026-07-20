import { z } from 'zod';

export const GetContentStateSchema = z.object({
  /** The id of the content whose content state is of interest. */
  id: z.string(),
  /** Set status to one of [current,draft,archived]. Default value is current. */
  status: z.enum(['current', 'draft', 'archived']).optional(),
});

export type GetContentState = z.input<typeof GetContentStateSchema>;
