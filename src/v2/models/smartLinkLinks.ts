import { z } from 'zod';
import { apiObject } from '#/core';

export const SmartLinkLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
});

export type SmartLinkLinks = z.infer<typeof SmartLinkLinksSchema>;
