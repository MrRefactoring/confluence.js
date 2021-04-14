import { Space } from './space';
import { GenericLinks } from './genericLinks';

export interface SpaceArray {
  results: Space[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
