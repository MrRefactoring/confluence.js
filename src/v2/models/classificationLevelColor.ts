import { z } from 'zod';

export const ClassificationLevelColorSchema = z.enum([
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
