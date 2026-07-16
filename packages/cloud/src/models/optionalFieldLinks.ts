import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const OptionalFieldLinksSchema = apiObject({
  /** A relative URL that can be used to fetch results beyond what this include parameter retrieves. */
  self: z.string().optional(),
});

export type OptionalFieldLinks = z.infer<typeof OptionalFieldLinksSchema>;
