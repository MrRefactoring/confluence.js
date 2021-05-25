import { LongTaskStatus } from './longTaskStatus';

/** Same as LongTaskStatus but with `_links` property. */
export interface LongTaskStatusWithLinks extends LongTaskStatus {
  _links: Record<string, any>;
}
