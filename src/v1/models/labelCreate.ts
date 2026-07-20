import { z } from 'zod';
import { apiObject } from '#/core';

export const LabelCreateSchema = apiObject({
  /** The prefix for the label. `global`, `my` `team`, etc. */
  prefix: z.string(),
  /** The name of the label, which will be shown in the UI. */
  name: z.string(),
});

export type LabelCreate = z.infer<typeof LabelCreateSchema>;
