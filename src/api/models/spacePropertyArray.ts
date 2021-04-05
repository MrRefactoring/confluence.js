import { SpaceProperty } from './spaceProperty';
import { GenericLinks } from './genericLinks';

export interface SpacePropertyArray {
  results: SpaceProperty[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
