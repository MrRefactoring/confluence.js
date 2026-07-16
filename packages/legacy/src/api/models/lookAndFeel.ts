import type { ContentLookAndFeel } from './contentLookAndFeel.js';
import type { HeaderLookAndFeel } from './headerLookAndFeel.js';
import type { HorizontalHeaderLookAndFeel } from './horizontalHeaderLookAndFeel.js';
import type { MenusLookAndFeel } from './menusLookAndFeel.js';

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
