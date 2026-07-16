import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const FolderLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
});

export type FolderLinks = z.infer<typeof FolderLinksSchema>;
