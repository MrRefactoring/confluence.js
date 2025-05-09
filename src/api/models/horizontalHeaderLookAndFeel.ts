import type { ButtonLookAndFeel } from './buttonLookAndFeel';
import type { NavigationLookAndFeel } from './navigationLookAndFeel';
import type { SearchFieldLookAndFeel } from './searchFieldLookAndFeel';
import type { TopNavigationLookAndFeel } from './topNavigationLookAndFeel';

export interface HorizontalHeaderLookAndFeel {
  backgroundColor: string;
  button?: ButtonLookAndFeel;
  primaryNavigation: TopNavigationLookAndFeel;
  secondaryNavigation?: NavigationLookAndFeel;
  search?: SearchFieldLookAndFeel;
}
