import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomContentVersionSchema } from './customContentVersion';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const CustomContentVersionsSchema = apiObject({
  results: z.array(CustomContentVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentVersions = z.infer<typeof CustomContentVersionsSchema>;
