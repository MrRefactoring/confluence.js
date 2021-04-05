import { MenusLookAndFeel } from './menusLookAndFeel';
import { HeaderLookAndFeel } from './headerLookAndFeel';
import { ContentLookAndFeel } from './contentLookAndFeel';

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
