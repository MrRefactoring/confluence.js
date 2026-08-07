import { z } from 'zod';
import { openEnum } from '#/core';

export const RemoveContentStateSchema = z.object({
  /** The Id of the content whose content state is to be set. */
  id: z.string(),
  /** Status of content state from which to delete state. Can be draft or archived */
  status: openEnum(['current', 'draft']).optional(),
});

export type RemoveContentState = z.input<typeof RemoveContentStateSchema>;
