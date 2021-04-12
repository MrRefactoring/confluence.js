import { ThemeNoLinks } from './themeNoLinks';

export interface Theme extends ThemeNoLinks {
  _links: Record<string, any>;
}
