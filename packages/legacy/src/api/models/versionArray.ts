import type { GenericLinks } from './genericLinks.js';
import type { Version } from './version.js';

export interface VersionArray {
  results: Version[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
