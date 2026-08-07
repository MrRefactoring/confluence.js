import type { z } from 'zod';
import { openEnum } from '#/core';
/** The type of space. */

export const SpaceTypeSchema = openEnum([
  'global',
  'collaboration',
  'knowledge_base',
  'personal',
  'system',
  'onboarding',
  'xflow_sample_space',
]);

export type SpaceType = z.infer<typeof SpaceTypeSchema>;
