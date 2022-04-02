import { GenericLinks } from './genericLinks';
import { SpaceWatch } from './spaceWatch';

export interface SpaceWatchArray {
  results: SpaceWatch[];
  start: number;
  limit: number;
  size: number;
  _links?: GenericLinks;
}
