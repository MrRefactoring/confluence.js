import { z } from 'zod';
import { apiObject } from '#/core';
import { SpacePropertySchema } from './spaceProperty';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SpacePropertiesSchema = apiObject({
  results: z.array(SpacePropertySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceProperties = z.infer<typeof SpacePropertiesSchema>;
