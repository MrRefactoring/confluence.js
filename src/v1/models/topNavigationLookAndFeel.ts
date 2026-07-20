import { z } from 'zod';
import { apiObject } from '#/core';

export const TopNavigationLookAndFeelSchema = apiObject({
  color: z.string().nullish(),
  highlightColor: z.string(),
  hoverOrFocus: apiObject({
    backgroundColor: z.string().optional(),
    color: z.string().optional(),
  }).optional(),
});

export type TopNavigationLookAndFeel = z.infer<typeof TopNavigationLookAndFeelSchema>;
