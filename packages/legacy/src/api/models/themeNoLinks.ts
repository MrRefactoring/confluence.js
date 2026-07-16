import type { Icon } from './icon.js';

/** Theme object without links. Used in ThemeArray. */
export interface ThemeNoLinks {
  themeKey: string;
  name: string;
  description: string;
  icon: Icon;
}
