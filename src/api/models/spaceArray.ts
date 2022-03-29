import { GenericLinks } from './genericLinks';
import { Space } from './space';

export interface SpaceArray {
  results: Space[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
