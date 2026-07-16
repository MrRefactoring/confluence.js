import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentPropertySchema } from './contentProperty';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SmartLinkContentPropertiesSchema = apiObject({
  results: z.array(ContentPropertySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SmartLinkContentProperties = z.infer<typeof SmartLinkContentPropertiesSchema>;
