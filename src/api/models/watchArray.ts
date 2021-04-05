import { Watch } from './watch';
import { GenericLinks } from './genericLinks';

export interface WatchArray {
  results: Watch[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
