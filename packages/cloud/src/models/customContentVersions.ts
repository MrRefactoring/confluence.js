import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { CustomContentVersionSchema } from './customContentVersion.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const CustomContentVersionsSchema = apiObject({
  results: z.array(CustomContentVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CustomContentVersions = z.infer<typeof CustomContentVersionsSchema>;
