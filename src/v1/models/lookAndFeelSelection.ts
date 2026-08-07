import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Look and feel selection */

export const LookAndFeelSelectionSchema = apiObject({
  /** The key of the space for which the look and feel settings will be set. */
  spaceKey: z.string(),
  lookAndFeelType: openEnum(['global', 'custom', 'theme']),
});

export type LookAndFeelSelection = z.infer<typeof LookAndFeelSelectionSchema>;
