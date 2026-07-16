import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const ForgeAppPropertySchema = apiObject({
  /** The key of the property */
  key: z.string().optional(),
  /** The value of the property */
  value: z.record(z.string(), z.any()).optional(),
});

export type ForgeAppProperty = z.infer<typeof ForgeAppPropertySchema>;
