import { z } from 'zod';
/** The type of space. */

export const SpaceTypeSchema = z.enum([
  'global',
  'collaboration',
  'knowledge_base',
  'personal',
  'system',
  'onboarding',
  'xflow_sample_space',
]);

export type SpaceType = z.infer<typeof SpaceTypeSchema>;
