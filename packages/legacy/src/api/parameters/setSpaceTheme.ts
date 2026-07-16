import type { ThemeUpdate } from '../models/index.js';

export interface SetSpaceTheme extends ThemeUpdate {
  /** The key of the space to set the theme for. */
  spaceKey: string;
}
