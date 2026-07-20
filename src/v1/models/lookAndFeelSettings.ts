import { z } from 'zod';
import { apiObject } from '#/core';
import { LookAndFeelSchema } from './lookAndFeel';

export const LookAndFeelSettingsSchema = apiObject({
  selected: z.enum(['global', 'custom']),
  global: LookAndFeelSchema,
  theme: LookAndFeelSchema.optional(),
  custom: LookAndFeelSchema,
});

export type LookAndFeelSettings = z.infer<typeof LookAndFeelSettingsSchema>;
