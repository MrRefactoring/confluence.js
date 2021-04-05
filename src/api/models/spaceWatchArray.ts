import { SpaceWatch } from './spaceWatch';
import { GenericLinks } from './genericLinks';

export interface SpaceWatchArray {
  results: SpaceWatch[];
  start: number;
  limit: number;
  size: number;
  _links?: GenericLinks;
}
