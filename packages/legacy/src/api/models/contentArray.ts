import type { Content } from './content.js';
import type { GenericLinks } from './genericLinks.js';

export interface ContentArray<T = Content> {
  results: T[];
  start?: number;
  limit?: number;
  size: number;
  _links: GenericLinks;
}
