import { GenericLinks } from './genericLinks';
import { LongTaskStatus } from './longTaskStatus';

export interface LongTaskStatusArray {
  results: LongTaskStatus[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
