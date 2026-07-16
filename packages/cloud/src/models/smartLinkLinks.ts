import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const SmartLinkLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
});

export type SmartLinkLinks = z.infer<typeof SmartLinkLinksSchema>;
