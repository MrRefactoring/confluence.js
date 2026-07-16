import type { ContentState } from './contentState.js';

export interface AvailableContentStates {
  /** Space suggested content states that can be used in the space */
  spaceContentStates: ContentState[];
  customContentStates: ContentState[];
}
