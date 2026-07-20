import { z } from 'zod';
import { apiObject } from '#/core';

export const ContentStateSchema = apiObject({
  /** Identifier of content state. If 0, 1, or 2, this is a default space state */
  id: z.number(),
  /** Name of content state. */
  name: z.string(),
  /** Hex string representing color of state */
  color: z.string(),
});

export type ContentState = z.infer<typeof ContentStateSchema>;
