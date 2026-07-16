import type { GenericLinks } from './genericLinks.js';
import type { Space } from './space.js';

export interface SpaceArray {
  results: Space[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
