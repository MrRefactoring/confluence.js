import type { GenericLinks } from './genericLinks';
import type { ThemeNoLinks } from './themeNoLinks';

export interface ThemeArray {
  results: ThemeNoLinks[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
