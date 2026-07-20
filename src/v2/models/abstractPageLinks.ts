import { z } from 'zod';
import { apiObject } from '#/core';

export const AbstractPageLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
  /** Edit UI link of the content. */
  editui: z.string().optional(),
  /** Web UI link of the content. */
  tinyui: z.string().optional(),
});

export type AbstractPageLinks = z.infer<typeof AbstractPageLinksSchema>;
