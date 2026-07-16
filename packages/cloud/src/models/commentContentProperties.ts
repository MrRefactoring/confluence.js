import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ContentPropertySchema } from './contentProperty.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const CommentContentPropertiesSchema = apiObject({
  results: z.array(ContentPropertySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type CommentContentProperties = z.infer<typeof CommentContentPropertiesSchema>;
