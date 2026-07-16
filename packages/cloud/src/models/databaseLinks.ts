import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const DatabaseLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
});

export type DatabaseLinks = z.infer<typeof DatabaseLinksSchema>;
