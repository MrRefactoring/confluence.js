import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const SpaceLinksSchema = apiObject({
  /** Web UI link of the space. */
  webui: z.string().optional(),
});

export type SpaceLinks = z.infer<typeof SpaceLinksSchema>;
