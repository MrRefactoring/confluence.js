import { z } from 'zod';
import { openEnum } from '#/core';
import { ContentStateRestInputSchema } from '../models';

export const SetContentStateSchema = z.object({
  /** The Id of the content whose content state is to be set. */
  id: z.string(),
  /**
   * Status of content onto which state will be placed. If draft, then draft state will change. If current, state will
   * be placed onto a new version of the content with same body as previous version.
   */
  status: openEnum(['current', 'draft']),
  body: ContentStateRestInputSchema,
});

export type SetContentState = z.input<typeof SetContentStateSchema>;
