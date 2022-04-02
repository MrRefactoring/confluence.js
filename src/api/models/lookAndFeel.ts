import { ContentLookAndFeel } from './contentLookAndFeel';
import { HeaderLookAndFeel } from './headerLookAndFeel';
import { HorizontalHeaderLookAndFeel } from './horizontalHeaderLookAndFeel';
import { MenusLookAndFeel } from './menusLookAndFeel';

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
