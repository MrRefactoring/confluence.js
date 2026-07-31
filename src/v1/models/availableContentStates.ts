import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStateSchema } from './contentState';

export const AvailableContentStatesSchema = apiObject({
  /**
   * Space suggested content states that can be used in the space. This list can be empty if there are no space content
   * states defined in the space or if space content states are disabled in the space. All spaces start with 4 default
   * space content states, and this can be modified in the UI under space settings.
   */
  spaceContentStates: z.array(ContentStateSchema),
  /**
   * Custom content states that can be used by the user on the content of this call. This list can be empty if there are
   * no custom content states defined by the user or if custom content states are disabled in the space of the content.
   * This will at most have 3 of the most recently published content states. Only the calling user has access to place
   * these states on content, but all users can see these states once they are placed.
   */
  customContentStates: z.array(ContentStateSchema),
});

export type AvailableContentStates = z.infer<typeof AvailableContentStatesSchema>;
