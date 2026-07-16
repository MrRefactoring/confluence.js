import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { PageVersionSchema } from './pageVersion.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const PageVersionsSchema = apiObject({
  results: z.array(PageVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageVersions = z.infer<typeof PageVersionsSchema>;
