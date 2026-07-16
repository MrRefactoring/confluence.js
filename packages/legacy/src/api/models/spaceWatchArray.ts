import type { GenericLinks } from './genericLinks.js';
import type { SpaceWatch } from './spaceWatch.js';

export interface SpaceWatchArray {
  results: SpaceWatch[];
  start: number;
  limit: number;
  size: number;
  _links?: GenericLinks;
}
