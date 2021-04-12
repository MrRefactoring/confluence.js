import { Icon } from './icon';

/**
 * Theme object without links. Used in ThemeArray.
 */
export interface ThemeNoLinks {
  themeKey: string;
  name: string;
  description: string;
  icon: Icon;
}
