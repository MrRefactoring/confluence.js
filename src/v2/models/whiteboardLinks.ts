import { z } from 'zod';
import { apiObject } from '#/core';

export const WhiteboardLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
  /** Edit UI link of the content. */
  editui: z.string().optional(),
});

export type WhiteboardLinks = z.infer<typeof WhiteboardLinksSchema>;
