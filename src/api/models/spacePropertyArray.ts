import type { GenericLinks } from './genericLinks';
import type { SpaceProperty } from './spaceProperty';

export interface SpacePropertyArray {
  results: SpaceProperty[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
