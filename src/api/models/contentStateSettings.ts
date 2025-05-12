import type { ContentState } from './contentState';

export interface ContentStateSettings {
  /** Whether users can place content states on any pages and blog posts in the space */
  contentStatesAllowed: boolean;
  /** Whether users can create custom states on the fly on pages and blog posts */
  customContentStatesAllowed: boolean;
  /** Whether space content states are allowed */
  spaceContentStatesAllowed: boolean;
  /** Space content states that users in the space can choose from */
  spaceContentStates?: ContentState[];
}
