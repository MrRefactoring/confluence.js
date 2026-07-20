import type { z } from 'zod';
import { apiObject } from '#/core';
import { ScreenLookAndFeelSchema } from './screenLookAndFeel';
import { ContainerLookAndFeelSchema } from './containerLookAndFeel';

export const ContentLookAndFeelSchema = apiObject({
  screen: ScreenLookAndFeelSchema.optional(),
  container: ContainerLookAndFeelSchema.optional(),
  header: ContainerLookAndFeelSchema.optional(),
  body: ContainerLookAndFeelSchema.optional(),
});

export type ContentLookAndFeel = z.infer<typeof ContentLookAndFeelSchema>;
