import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { SpacePropertySchema } from './spaceProperty.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const SpacePropertiesSchema = apiObject({
  results: z.array(SpacePropertySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceProperties = z.infer<typeof SpacePropertiesSchema>;
