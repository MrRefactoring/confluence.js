import { ThemeUpdate } from '../models';

export interface SetSpaceTheme extends ThemeUpdate {
  /** The key of the space to set the theme for. */
  spaceKey: string;
}
