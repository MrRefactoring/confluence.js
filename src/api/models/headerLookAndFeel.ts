import type { ButtonLookAndFeel } from './buttonLookAndFeel';
import type { NavigationLookAndFeel } from './navigationLookAndFeel';
import type { SearchFieldLookAndFeel } from './searchFieldLookAndFeel';

export interface HeaderLookAndFeel {
  backgroundColor: string;
  button: ButtonLookAndFeel;
  primaryNavigation: NavigationLookAndFeel;
  secondaryNavigation: NavigationLookAndFeel;
  search: SearchFieldLookAndFeel;
}
