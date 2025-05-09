import type { ContentLookAndFeel } from './contentLookAndFeel';
import type { HeaderLookAndFeel } from './headerLookAndFeel';
import type { HorizontalHeaderLookAndFeel } from './horizontalHeaderLookAndFeel';
import type { MenusLookAndFeel } from './menusLookAndFeel';

export interface LookAndFeel {
  headings: {
    color: string;
  };
  links: {
    color: string;
  };
  menus: MenusLookAndFeel;
  header: HeaderLookAndFeel;
  content: ContentLookAndFeel;
  bordersAndDividers: {
    color: string;
  };
  horizontalHeader?: HorizontalHeaderLookAndFeel;
  spaceReference?: unknown;
}
