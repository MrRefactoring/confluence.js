import type { GenericLinks } from './genericLinks';
import type { Watch } from './watch';

export interface WatchArray {
  results: Watch[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
