import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomContentLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
});

export type CustomContentLinks = z.infer<typeof CustomContentLinksSchema>;
