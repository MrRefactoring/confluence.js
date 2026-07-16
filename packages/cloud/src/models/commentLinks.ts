import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const CommentLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
});

export type CommentLinks = z.infer<typeof CommentLinksSchema>;
