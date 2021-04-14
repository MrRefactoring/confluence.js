import { LongTaskStatus } from './longTaskStatus';
import { GenericLinks } from './genericLinks';

export interface LongTaskStatusArray {
  results: LongTaskStatus[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
