import type { GenericLinks } from './genericLinks.js';
import type { SpaceProperty } from './spaceProperty.js';

export interface SpacePropertyArray {
  results: SpaceProperty[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
