import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentPropertySchema } from './contentProperty.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const SmartLinkContentPropertiesSchema = apiObject({
  results: z.array(ContentPropertySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SmartLinkContentProperties = z.infer<typeof SmartLinkContentPropertiesSchema>;
