import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { LookAndFeelSchema } from './lookAndFeel';

export const LookAndFeelSettingsSchema = apiObject({
  selected: openEnum(['global', 'custom']),
  global: LookAndFeelSchema,
  theme: LookAndFeelSchema.optional(),
  custom: LookAndFeelSchema,
});

export type LookAndFeelSettings = z.infer<typeof LookAndFeelSettingsSchema>;
