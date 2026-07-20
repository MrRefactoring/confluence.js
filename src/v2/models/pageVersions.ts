import { z } from 'zod';
import { apiObject } from '#/core';
import { PageVersionSchema } from './pageVersion';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const PageVersionsSchema = apiObject({
  results: z.array(PageVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageVersions = z.infer<typeof PageVersionsSchema>;
