import { z } from 'zod';
import { apiObject } from '#/core';
import { ButtonLookAndFeelSchema } from './buttonLookAndFeel';
import { NavigationLookAndFeelSchema } from './navigationLookAndFeel';
import { SearchFieldLookAndFeelSchema } from './searchFieldLookAndFeel';

export const HeaderLookAndFeelSchema = apiObject({
  backgroundColor: z.string(),
  button: ButtonLookAndFeelSchema,
  primaryNavigation: NavigationLookAndFeelSchema,
  secondaryNavigation: NavigationLookAndFeelSchema,
  search: SearchFieldLookAndFeelSchema,
});

export type HeaderLookAndFeel = z.infer<typeof HeaderLookAndFeelSchema>;
