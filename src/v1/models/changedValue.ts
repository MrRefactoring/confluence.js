import { z } from 'zod';
import { apiObject } from '#/core';

export const ChangedValueSchema = apiObject({
  name: z.string(),
  oldValue: z.string(),
  hiddenOldValue: z.string().optional(),
  newValue: z.string(),
  hiddenNewValue: z.string().optional(),
});

export type ChangedValue = z.infer<typeof ChangedValueSchema>;
