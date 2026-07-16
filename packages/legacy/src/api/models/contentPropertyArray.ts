import type { ContentProperty } from './contentProperty.js';
import type { GenericLinks } from './genericLinks.js';

export interface ContentPropertyArray {
  results: ContentProperty[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
