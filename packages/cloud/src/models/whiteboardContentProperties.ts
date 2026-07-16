import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentPropertySchema } from './contentProperty.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const WhiteboardContentPropertiesSchema = apiObject({
  results: z.array(ContentPropertySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type WhiteboardContentProperties = z.infer<typeof WhiteboardContentPropertiesSchema>;
