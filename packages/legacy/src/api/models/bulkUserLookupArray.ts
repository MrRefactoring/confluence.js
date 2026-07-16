import type { BulkUserLookup } from './bulkUserLookup.js';
import type { GenericLinks } from './genericLinks.js';

export interface BulkUserLookupArray {
  results: BulkUserLookup[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
