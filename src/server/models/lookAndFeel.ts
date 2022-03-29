import { ContentLookAndFeel } from './contentLookAndFeel';
import { HeaderLookAndFeel } from './headerLookAndFeel';
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
}
