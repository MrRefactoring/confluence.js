import { z } from 'zod';
import { apiObject } from '#/core';

export const MultiEntityLinksSchema = apiObject({
  /**
   * Used for pagination. Contains the relative URL for the next set of results, using a cursor query parameter. This
   * property will not be present if there is no additional data available.
   */
  next: z.string().optional(),
  /** Base url of the Confluence site. */
  base: z.string().optional(),
});

export type MultiEntityLinks = z.infer<typeof MultiEntityLinksSchema>;
