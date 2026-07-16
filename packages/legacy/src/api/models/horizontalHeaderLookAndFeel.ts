import type { ButtonLookAndFeel } from './buttonLookAndFeel.js';
import type { NavigationLookAndFeel } from './navigationLookAndFeel.js';
import type { SearchFieldLookAndFeel } from './searchFieldLookAndFeel.js';
import type { TopNavigationLookAndFeel } from './topNavigationLookAndFeel.js';

export interface HorizontalHeaderLookAndFeel {
  backgroundColor: string;
  button?: ButtonLookAndFeel;
  primaryNavigation: TopNavigationLookAndFeel;
  secondaryNavigation?: NavigationLookAndFeel;
  search?: SearchFieldLookAndFeel;
}
