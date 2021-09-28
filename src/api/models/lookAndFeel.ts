import { MenusLookAndFeel } from './menusLookAndFeel';
import { HeaderLookAndFeel } from './headerLookAndFeel';
import { ContentLookAndFeel } from './contentLookAndFeel';
import { HorizontalHeaderLookAndFeel } from './horizontalHeaderLookAndFeel';

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
