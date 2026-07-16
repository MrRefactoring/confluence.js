import { z } from 'zod';
import { apiObject } from '#/core';

export const LabelSchema = apiObject({
  prefix: z.string(),
  name: z.string(),
  id: z.string(),
  label: z.string(),
});

export type Label = z.infer<typeof LabelSchema>;
