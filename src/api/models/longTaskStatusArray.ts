import type { GenericLinks } from './genericLinks';
import type { LongTaskStatus } from './longTaskStatus';

export interface LongTaskStatusArray {
  results: LongTaskStatus[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
