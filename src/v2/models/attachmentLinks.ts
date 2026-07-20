import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
  /** Download link of the content. */
  download: z.string().optional(),
});

export type AttachmentLinks = z.infer<typeof AttachmentLinksSchema>;
