import { z } from 'zod';
import { apiObject } from '#/core';
import { MenusLookAndFeelSchema } from './menusLookAndFeel';
import { HeaderLookAndFeelSchema } from './headerLookAndFeel';
import { HorizontalHeaderLookAndFeelSchema } from './horizontalHeaderLookAndFeel';
import { ContentLookAndFeelSchema } from './contentLookAndFeel';

export const LookAndFeelSchema = apiObject({
  headings: apiObject({
    color: z.string(),
  }),
  links: apiObject({
    color: z.string(),
  }),
  menus: MenusLookAndFeelSchema,
  header: HeaderLookAndFeelSchema,
  horizontalHeader: HorizontalHeaderLookAndFeelSchema.optional(),
  content: ContentLookAndFeelSchema,
  bordersAndDividers: apiObject({
    color: z.string(),
  }),
  spaceReference: z.record(z.string(), z.any()).nullish(),
});

export type LookAndFeel = z.infer<typeof LookAndFeelSchema>;
