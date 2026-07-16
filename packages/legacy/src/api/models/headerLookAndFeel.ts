import type { ButtonLookAndFeel } from './buttonLookAndFeel.js';
import type { NavigationLookAndFeel } from './navigationLookAndFeel.js';
import type { SearchFieldLookAndFeel } from './searchFieldLookAndFeel.js';

export interface HeaderLookAndFeel {
  backgroundColor: string;
  button: ButtonLookAndFeel;
  primaryNavigation: NavigationLookAndFeel;
  secondaryNavigation: NavigationLookAndFeel;
  search: SearchFieldLookAndFeel;
}
