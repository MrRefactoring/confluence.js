import { ButtonLookAndFeel } from './buttonLookAndFeel';
import { TopNavigationLookAndFeel } from './topNavigationLookAndFeel';
import { NavigationLookAndFeel } from './navigationLookAndFeel';
import { SearchFieldLookAndFeel } from './searchFieldLookAndFeel';

export interface HorizontalHeaderLookAndFeel {
  backgroundColor: string;
  button?: ButtonLookAndFeel;
  primaryNavigation: TopNavigationLookAndFeel;
  secondaryNavigation?: NavigationLookAndFeel;
  search?: SearchFieldLookAndFeel;
}
