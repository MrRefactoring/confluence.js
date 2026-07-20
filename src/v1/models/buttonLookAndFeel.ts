import { z } from 'zod';
import { apiObject } from '#/core';

export const ButtonLookAndFeelSchema = apiObject({
  backgroundColor: z.string(),
  color: z.string(),
});

export type ButtonLookAndFeel = z.infer<typeof ButtonLookAndFeelSchema>;
