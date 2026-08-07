import type { z } from 'zod';
import { openEnum } from '#/core';

export const ClassificationLevelColorSchema = openEnum([
  'RED',
  'RED_BOLD',
  'ORANGE',
  'YELLOW',
  'GREEN',
  'BLUE',
  'NAVY',
  'TEAL',
  'PURPLE',
  'GREY',
  'LIME',
]);

export type ClassificationLevelColor = z.infer<typeof ClassificationLevelColorSchema>;
