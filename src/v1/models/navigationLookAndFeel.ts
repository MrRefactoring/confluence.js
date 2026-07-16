import { z } from 'zod';
import { apiObject } from '#/core';

export const NavigationLookAndFeelSchema = apiObject({
  color: z.string(),
  highlightColor: z.string().nullish(),
  hoverOrFocus: apiObject({
    backgroundColor: z.string(),
    color: z.string(),
  }),
});

export type NavigationLookAndFeel = z.infer<typeof NavigationLookAndFeelSchema>;
