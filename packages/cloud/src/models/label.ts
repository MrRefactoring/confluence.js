import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const LabelSchema = apiObject({
  /** ID of the label. */
  id: z.string().optional(),
  /** Name of the label. */
  name: z.string().optional(),
  /** Prefix of the label. */
  prefix: z.string().optional(),
});

export type Label = z.infer<typeof LabelSchema>;
