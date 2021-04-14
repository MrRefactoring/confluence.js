import { ButtonLookAndFeel } from './buttonLookAndFeel';
import { NavigationLookAndFeel } from './navigationLookAndFeel';
import { SearchFieldLookAndFeel } from './searchFieldLookAndFeel';

export interface HeaderLookAndFeel {
  backgroundColor: string;
  button: ButtonLookAndFeel;
  primaryNavigation: NavigationLookAndFeel;
  secondaryNavigation: NavigationLookAndFeel;
  search: SearchFieldLookAndFeel;
}
