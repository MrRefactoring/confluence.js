import { z } from 'zod';
import { apiObject } from '#/core';

export const MenusLookAndFeelSchema = apiObject({
  hoverOrFocus: apiObject({
    backgroundColor: z.string(),
  }),
  color: z.string(),
});

export type MenusLookAndFeel = z.infer<typeof MenusLookAndFeelSchema>;
