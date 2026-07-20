import { z } from 'zod';
import { apiObject } from '#/core';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const ForgeAppPropertiesSchema = apiObject({
  results: z
    .array(
      apiObject({
        /** The key of the property */
        key: z.string().optional(),
        /** The value of the property */
        value: z.record(z.string(), z.any()).optional(),
      }),
    )
    .optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type ForgeAppProperties = z.infer<typeof ForgeAppPropertiesSchema>;
