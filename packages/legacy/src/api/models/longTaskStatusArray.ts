import type { GenericLinks } from './genericLinks.js';
import type { LongTaskStatus } from './longTaskStatus.js';

export interface LongTaskStatusArray {
  results: LongTaskStatus[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
