import type { GenericLinks } from './genericLinks.js';
import type { ThemeNoLinks } from './themeNoLinks.js';

export interface ThemeArray {
  results: ThemeNoLinks[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
