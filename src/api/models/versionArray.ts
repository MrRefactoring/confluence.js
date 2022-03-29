import { GenericLinks } from './genericLinks';
import { Version } from './version';

export interface VersionArray {
  results: Version[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
