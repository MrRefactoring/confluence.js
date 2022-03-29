import { GenericLinks } from './genericLinks';
import { ThemeNoLinks } from './themeNoLinks';

export interface ThemeArray {
  results: ThemeNoLinks[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
