import { GenericLinks } from './genericLinks';
import { SpaceProperty } from './spaceProperty';

export interface SpacePropertyArray {
  results: SpaceProperty[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
