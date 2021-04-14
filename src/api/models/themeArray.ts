import { ThemeNoLinks } from './themeNoLinks';
import { GenericLinks } from './genericLinks';

export interface ThemeArray {
  results: ThemeNoLinks[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
