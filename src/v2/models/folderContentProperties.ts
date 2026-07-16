import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentPropertySchema } from './contentProperty';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const FolderContentPropertiesSchema = apiObject({
  results: z.array(ContentPropertySchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FolderContentProperties = z.infer<typeof FolderContentPropertiesSchema>;
