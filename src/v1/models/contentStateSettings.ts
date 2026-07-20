import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStateSchema } from './contentState';

export const ContentStateSettingsSchema = apiObject({
  /** Whether users can place any content states on content */
  contentStatesAllowed: z.boolean(),
  /** Whether users can place their custom states on content */
  customContentStatesAllowed: z.boolean(),
  /** Whether users can place space suggested states on content */
  spaceContentStatesAllowed: z.boolean(),
  /** Space suggested content states that users can choose from */
  spaceContentStates: z.array(ContentStateSchema).optional(),
});

export type ContentStateSettings = z.infer<typeof ContentStateSettingsSchema>;
