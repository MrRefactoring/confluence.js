import { Version } from './version';
import { GenericLinks } from './genericLinks';

export interface VersionArray {
  results: Version[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
