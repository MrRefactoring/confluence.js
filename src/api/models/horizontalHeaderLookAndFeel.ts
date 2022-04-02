import { ButtonLookAndFeel } from './buttonLookAndFeel';
import { NavigationLookAndFeel } from './navigationLookAndFeel';
import { SearchFieldLookAndFeel } from './searchFieldLookAndFeel';
import { TopNavigationLookAndFeel } from './topNavigationLookAndFeel';

export interface HorizontalHeaderLookAndFeel {
  backgroundColor: string;
  button?: ButtonLookAndFeel;
  primaryNavigation: TopNavigationLookAndFeel;
  secondaryNavigation?: NavigationLookAndFeel;
  search?: SearchFieldLookAndFeel;
}
