import type { GenericLinks } from './genericLinks.js';
import type { Watch } from './watch.js';

export interface WatchArray {
  results: Watch[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
