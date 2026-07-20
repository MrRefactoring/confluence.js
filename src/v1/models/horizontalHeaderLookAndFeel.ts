import { z } from 'zod';
import { apiObject } from '#/core';
import { ButtonLookAndFeelSchema } from './buttonLookAndFeel';
import { TopNavigationLookAndFeelSchema } from './topNavigationLookAndFeel';
import { NavigationLookAndFeelSchema } from './navigationLookAndFeel';
import { SearchFieldLookAndFeelSchema } from './searchFieldLookAndFeel';

export const HorizontalHeaderLookAndFeelSchema = apiObject({
  backgroundColor: z.string(),
  button: ButtonLookAndFeelSchema.optional(),
  primaryNavigation: TopNavigationLookAndFeelSchema,
  secondaryNavigation: NavigationLookAndFeelSchema.optional(),
  search: SearchFieldLookAndFeelSchema.optional(),
});

export type HorizontalHeaderLookAndFeel = z.infer<typeof HorizontalHeaderLookAndFeelSchema>;
